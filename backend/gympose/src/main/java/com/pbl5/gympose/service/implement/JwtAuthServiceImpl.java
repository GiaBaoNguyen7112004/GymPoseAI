package com.pbl5.gympose.service.implement;

import com.pbl5.gympose.entity.Role;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.enums.RoleEnum;
import com.pbl5.gympose.exception.BadRequestException;
import com.pbl5.gympose.exception.UnauthenticatedException;
import com.pbl5.gympose.exception.message.ErrorMessage;
import com.pbl5.gympose.mapper.UserMapper;
import com.pbl5.gympose.payload.request.LoginRequest;
import com.pbl5.gympose.payload.request.SignUpRequest;
import com.pbl5.gympose.payload.response.JwtLoginResponse;
import com.pbl5.gympose.payload.response.LoginResponse;
import com.pbl5.gympose.payload.response.SignUpResponse;
import com.pbl5.gympose.security.domain.UserPrincipal;
import com.pbl5.gympose.security.service.JwtUtils;
import com.pbl5.gympose.service.AuthService;
import com.pbl5.gympose.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
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

    @Override
    public SignUpResponse signUp(SignUpRequest signUpRequest) {
        User user = userMapper.toUser(signUpRequest);
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setRoles(Stream.of(new Role(RoleEnum.USER.name())).toList());

        return new SignUpResponse(userMapper.toUserResponse(userService.save(user)));
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            List<String> roles = userPrincipal.getAuthorities()
                    .stream().map(GrantedAuthority::getAuthority).toList();
            String email = userPrincipal.getUsername();

            String refreshToken = jwtUtils.generateToken(email, roles, true);
            String accessToken = jwtUtils.generateToken(email, roles, false);

            return new JwtLoginResponse(userMapper.toUserResponse(userService.findByEmail(email)),
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
}
