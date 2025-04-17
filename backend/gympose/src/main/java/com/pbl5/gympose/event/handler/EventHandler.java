package com.pbl5.gympose.event.handler;

import com.pbl5.gympose.entity.Token;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.enums.TokenType;
import com.pbl5.gympose.event.UserRegistrationEvent;
import com.pbl5.gympose.service.TokenService;
import com.pbl5.gympose.service.email.EmailService;
import com.pbl5.gympose.utils.CommonConstant;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;


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
}
