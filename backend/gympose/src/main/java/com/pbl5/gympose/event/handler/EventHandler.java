package com.pbl5.gympose.event.handler;

import com.pbl5.gympose.entity.Token;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.entity.WorkoutSummary;
import com.pbl5.gympose.enums.TokenType;
import com.pbl5.gympose.event.RequestResetPasswordEvent;
import com.pbl5.gympose.event.ResendRequestResetPasswordEvent;
import com.pbl5.gympose.event.UserRegistrationEvent;
import com.pbl5.gympose.event.WorkoutFinishEvent;
import com.pbl5.gympose.service.ActivityService;
import com.pbl5.gympose.service.NotificationService;
import com.pbl5.gympose.service.TargetService;
import com.pbl5.gympose.service.TokenService;
import com.pbl5.gympose.service.email.EmailService;
import com.pbl5.gympose.utils.CommonConstant;
import com.pbl5.gympose.utils.CommonFunction;
import com.pbl5.gympose.utils.TokenUtils;
import com.pbl5.gympose.utils.WorkoutUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;


@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EventHandler {
    EmailService emailService;
    TokenService tokenService;
    TargetService targetService;
    NotificationService notificationService;
    ActivityService activityService;

    @EventListener
    private void createVerificationToken(UserRegistrationEvent event) {
        User user = event.getUser();
        Token token = tokenService.createToken(user, TokenType.ACCOUNT_VERIFICATION);
        emailService.sendMailConfirmRegister(user.getFirstName(), user.getLastName(), user.getEmail(),
                token.getToken(), CommonConstant.LANGUAGE_CODE);
    }

    @EventListener
    private void createUserTarget(UserRegistrationEvent event) {
        User user = event.getUser();
        targetService.createUserTarget(user.getId());
    }

    @EventListener
    private void handleRequestResetPasswordEvent(RequestResetPasswordEvent event) {
        User user = event.getUser();

        Optional<Token> tokenResult = tokenService.findOtp(user.getId());
        Token token;
        if (tokenResult.isPresent()) {
            token = tokenResult.get();
            token.setToken(String.valueOf(CommonFunction.getRandomFourDigitNumber()));
            token.setExpireTime(LocalDateTime.now().plusMinutes(TokenUtils.OTP_EXPIRATION_MINUTES));
            tokenService.save(token);
        } else {
            token = tokenService.createToken(user, TokenType.RESET_PASSWORD);
        }

        emailService.sendMailForgetPassword(user.getEmail(), token.getToken(), CommonConstant.LANGUAGE_CODE);
    }

    @EventListener
    private void handleResendRequestResetPasswordEvent(ResendRequestResetPasswordEvent event) {
        User user = event.getUser();
        Optional<Token> tokenResult = tokenService.findOtp(user.getId());
        Token token;
        token = tokenResult.orElseGet(() -> tokenService.createToken(user, TokenType.RESET_PASSWORD));
        token.setToken(String.valueOf(CommonFunction.getRandomFourDigitNumber()));
        token.setExpireTime(LocalDateTime.now().plusMinutes(TokenUtils.OTP_EXPIRATION_MINUTES));
        tokenService.save(token);
        emailService.sendMailForgetPassword(user.getEmail(), token.getToken(), CommonConstant.LANGUAGE_CODE);
    }

    @EventListener
    private void notifyUserWhenWorkoutFinished(WorkoutFinishEvent event) {
        notificationService.notifyWorkoutFinish(event.getWorkoutSummary());
    }

    @EventListener
    private void createCaloriesWhenWorkoutFinished(WorkoutFinishEvent event) {
        activityService.createCaloriesConsumption(event.getWorkoutSummary());
    }

    @EventListener
    private void updateCaloriesBurned(WorkoutFinishEvent event) {
        WorkoutSummary workoutSummary = event.getWorkoutSummary();
        targetService.updateCaloriesBurned(workoutSummary.getUser().getId(),
                WorkoutUtils.getCaloriesBurned(workoutSummary, workoutSummary.getUser().getWeight(), workoutSummary.getExercise()));
    }
}
