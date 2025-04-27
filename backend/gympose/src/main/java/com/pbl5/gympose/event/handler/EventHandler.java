package com.pbl5.gympose.event.handler;

import com.pbl5.gympose.entity.Token;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.enums.TokenType;
import com.pbl5.gympose.event.RequestResetPasswordEvent;
import com.pbl5.gympose.event.ResendRequestResetPasswordEvent;
import com.pbl5.gympose.event.UserRegistrationEvent;
import com.pbl5.gympose.service.TokenService;
import com.pbl5.gympose.service.email.EmailService;
import com.pbl5.gympose.utils.CommonConstant;
import com.pbl5.gympose.utils.CommonFunction;
import com.pbl5.gympose.utils.TokenUtil;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;


@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EventHandler {
    EmailService emailService;
    TokenService tokenService;

    @EventListener
    private void handleUserRegistrationEvent(UserRegistrationEvent event) {
        User user = event.getUser();
        Token token = tokenService.createToken(user, TokenType.ACCOUNT_VERIFICATION);

        emailService.sendMailConfirmRegister(user.getFirstName(), user.getLastName(), user.getEmail(),
                token.getToken(), CommonConstant.LANGUAGE_CODE);
    }

    @EventListener
    private void handleRequestResetPasswordEvent(RequestResetPasswordEvent event) {
        User user = event.getUser();
        Token token = tokenService.createToken(user, TokenType.RESET_PASSWORD);

        emailService.sendMailForgetPassword(user.getEmail(), token.getToken(), CommonConstant.LANGUAGE_CODE);
    }

    @EventListener
    private void handleResendRequestResetPasswordEvent(ResendRequestResetPasswordEvent event) {
        User user = event.getUser();
        Token token = tokenService.findOtp(user.getId());
        token.setToken(String.valueOf(CommonFunction.getRandomFourDigitNumber()));
        token.setExpireTime(LocalDateTime.now().plusMinutes(TokenUtil.OTP_EXPIRATION_MINUTES));
        tokenService.save(token);
        emailService.sendMailForgetPassword(user.getEmail(), token.getToken(), CommonConstant.LANGUAGE_CODE);
    }
}
