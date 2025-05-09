package com.pbl5.gympose.event.handler;

import com.pbl5.gympose.entity.Token;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.entity.WorkoutSummary;
import com.pbl5.gympose.enums.NotificationType;
import com.pbl5.gympose.enums.TokenType;
import com.pbl5.gympose.event.*;
import com.pbl5.gympose.payload.request.notification.NotificationRequest;
import com.pbl5.gympose.service.NotificationService;
import com.pbl5.gympose.service.TargetService;
import com.pbl5.gympose.service.TokenService;
import com.pbl5.gympose.service.email.EmailService;
import com.pbl5.gympose.utils.CommonConstant;
import com.pbl5.gympose.utils.CommonFunction;
import com.pbl5.gympose.utils.TokenUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;


@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EventHandler {
    EmailService emailService;
    TokenService tokenService;
    TargetService targetService;
    NotificationService notificationService;

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
        token.setExpireTime(LocalDateTime.now().plusMinutes(TokenUtils.OTP_EXPIRATION_MINUTES));
        tokenService.save(token);
        emailService.sendMailForgetPassword(user.getEmail(), token.getToken(), CommonConstant.LANGUAGE_CODE);
    }

    @EventListener
    private void handleAccountVerificationEvent(AccountVerificationEvent event) {
        User user = event.getUser();
        targetService.createUserTarget(user.getId());
    }

    @EventListener
    private void handleWorkoutFinishEvent(WorkoutFinishEvent event) {
        WorkoutSummary workoutSummary = event.getWorkoutSummary();
        Map<String, Object> metadata = new HashMap<>();
        User user = workoutSummary.getUser();
        metadata.put("workout_id", workoutSummary.getId());
        NotificationRequest notificationRequest = NotificationRequest.builder()
                .userId(user.getId())
                .type(NotificationType.WORKOUT)
                .title("Congratulation! You just fininshed the workout")
                .description("You have a new exercise in today plan")
                .metaData(metadata)
                .build();

        tokenService.findAllByTypeAndUserId(TokenType.EXPO_PUSH_NOTIFICATION, user.getId()).forEach(
                token -> notificationService.sendPushNotification(token.getToken(), notificationRequest));
    }
}
