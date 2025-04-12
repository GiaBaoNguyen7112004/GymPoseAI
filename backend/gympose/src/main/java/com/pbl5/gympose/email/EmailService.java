package com.pbl5.gympose.email;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmailService {
    final SendingEmailService sendingEmailService;

    @Value("${web-url}")
    String webUrl;

    public void sendMailConfirmRegister(
            String firstname, String lastname, String email, String confirmToken, String language) {
        String url = webUrl + "/register/confirm?token=" + confirmToken;

        sendingEmailService.sendEmailFromTemplate(
                email,
                "mail/accountVerificationEmail",
                url,
                "email.register.user.subject",
                firstname.concat(" ").concat(lastname),
                language);
    }

    public void sendMailForgetPassword(
            String email, UUID resetPasswordToken, String language) {
        String url = webUrl + "/password/reset?email=" + email + "&token=" + resetPasswordToken;
        sendingEmailService.sendEmailFromTemplate(
                email, "mail/resetPassword", url, "email.reset.password.subject", null, language);
    }

    public void sendMailDeleteAccount(String email, String code, String language) {
        sendingEmailService.sendDeleteAccount(email, code, language);
    }
}
