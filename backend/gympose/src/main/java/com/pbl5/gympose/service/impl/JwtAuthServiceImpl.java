package com.pbl5.gympose.service.impl;

import com.pbl5.gympose.entity.Role;
import com.pbl5.gympose.entity.Token;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.entity.UserPrincipal;
import com.pbl5.gympose.enums.CachePrefix;
import com.pbl5.gympose.enums.RoleName;
import com.pbl5.gympose.event.RequestResetPasswordEvent;
import com.pbl5.gympose.event.ResendRequestResetPasswordEvent;
import com.pbl5.gympose.event.UserRegistrationEvent;
import com.pbl5.gympose.exception.BadRequestException;
import com.pbl5.gympose.exception.UnauthenticatedException;
import com.pbl5.gympose.mapper.UserMapper;
import com.pbl5.gympose.payload.request.auth.*;
import com.pbl5.gympose.payload.response.auth.JwtLoginResponse;
import com.pbl5.gympose.payload.response.auth.LoginResponse;
import com.pbl5.gympose.payload.response.auth.SignUpResponse;
import com.pbl5.gympose.service.AuthService;
import com.pbl5.gympose.service.TokenService;
import com.pbl5.gympose.service.UserService;
import com.pbl5.gympose.service.cache.CacheService;
import com.pbl5.gympose.utils.exception.ErrorMessage;
import com.pbl5.gympose.utils.jwt.JwtUtils;
import io.jsonwebtoken.Claims;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class JwtAuthServiceImpl implements AuthService {
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;
    JwtUtils jwtUtils;
    AuthenticationManager authenticationManager;
    UserService userService;
    ApplicationEventPublisher eventPublisher;
    TokenService tokenService;
    CacheService cacheService;


    @Override
    public SignUpResponse signUp(SignUpRequest signUpRequest) {
        if (userService.isExistedUser(signUpRequest.getEmail())) {
            throw new BadRequestException(ErrorMessage.USER_ALREADY_EXISTED);
        }

        User user = userMapper.toUser(signUpRequest);
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setRoles(Stream.of(new Role(RoleName.USER.name())).toList());
        User savedUser = userService.save(user);

        eventPublisher.publishEvent(new UserRegistrationEvent(savedUser));
        return new SignUpResponse(userMapper.toUserResponse(savedUser));
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            String email = userPrincipal.getUsername();

            boolean isRefreshToken = true;
            String refreshToken = jwtUtils.generateToken(email, isRefreshToken);
            String accessToken = jwtUtils.generateToken(email, !isRefreshToken);

            return new JwtLoginResponse(userMapper.toUserResponse(userService.findById(userPrincipal.getId())),
                    accessToken, refreshToken);
        } catch (BadCredentialsException e) {
            throw new BadRequestException(ErrorMessage.INCORRECT_EMAIL_OR_PASSWORD);
        } catch (InternalAuthenticationServiceException e) {
            throw new UnauthenticatedException(ErrorMessage.ACCOUNT_NOT_EXISTED);
        } catch (DisabledException e) {
            User user = userService.findByEmail(loginRequest.getEmail());
            if (user.getAccountVerifiedAt() != null) {
                throw new UnauthenticatedException(ErrorMessage.ACCOUNT_LOCKED);
            } else {
                throw new UnauthenticatedException(ErrorMessage.ACCOUNT_NOT_ACTIVE);
            }
        } catch (AuthenticationException e) {
            throw new UnauthenticatedException(ErrorMessage.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    @Override
    public void verifyAccount(AccountVerificationRequest accountVerificationRequest) {
        User user = userService.findByToken(accountVerificationRequest.getAccountVerificationToken());
        if (user.getAccountVerifiedAt() != null) {
            throw new BadRequestException(ErrorMessage.ACCOUNT_ALREADY_ACTIVE);
        }
        user.setIsEnabled(true);
        user.setAccountVerifiedAt(LocalDateTime.now());
        tokenService.deleteToken(accountVerificationRequest.getAccountVerificationToken());
        userService.save(user);
    }

    @Override
    public void logout(LogoutRequest logoutRequest) {
        String refreshToken = logoutRequest.getRefreshToken();

        boolean isRefreshToken = true;
        Claims refreshTokenClaims = jwtUtils.verifyToken(refreshToken, isRefreshToken);

        String prefix = CachePrefix.BLACK_LIST_TOKENS.getPrefix();
        cacheService.set(prefix + jwtUtils.getJwtIdFromJWTClaims(refreshTokenClaims), 1,
                jwtUtils.getTokenAvailableDuration(refreshTokenClaims), TimeUnit.MILLISECONDS);
    }

    @Override
    public void requestResetPassword(RequestResetPasswordRequest resetPasswordRequest) {
        User user = userService.findByEmail(resetPasswordRequest.getEmail());
        eventPublisher.publishEvent(new RequestResetPasswordEvent(user));
    }

    @Override
    public boolean verifyOTP(OtpVerificationRequest otpVerificationRequest) {
        User user = userService.findByEmail(otpVerificationRequest.getEmail());
        return tokenService.verifyOTP(user.getId(), otpVerificationRequest.getOtp());
    }

    @Transactional
    @Override
    public void resetPassword(ResetPasswordRequest request) {
        User user = userService.findByEmail(request.getEmail());
        Token token = tokenService.findToken(request.getOtp());
        if (tokenService.verifyOTP(user.getId(), request.getOtp())) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            userService.save(user);
            tokenService.deleteToken(token.getToken());
        } else throw new BadRequestException(ErrorMessage.INVALID_OTP);
    }

    @Override
    public void resendResetPassword(RequestResetPasswordRequest resetPasswordRequest) {
        User user = userService.findByEmail(resetPasswordRequest.getEmail());
        eventPublisher.publishEvent(new ResendRequestResetPasswordEvent(user));
    }
}
