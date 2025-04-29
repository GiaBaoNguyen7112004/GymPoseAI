package com.pbl5.gympose.controller;

import com.pbl5.gympose.entity.UserPrincipal;
import com.pbl5.gympose.payload.general.ResponseData;
import com.pbl5.gympose.payload.request.auth.*;
import com.pbl5.gympose.security.annotation.CurrentUser;
import com.pbl5.gympose.service.AuthService;
import com.pbl5.gympose.utils.ApiPath;
import com.pbl5.gympose.utils.FeedbackMessage;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiPath.AUTH)
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Auth API", description = "Authentication")
public class AuthController {
    AuthService authService;

    @PostMapping(ApiPath.SIGN_UP)
    public ResponseEntity<ResponseData> signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        ResponseData responseData = ResponseData.success(authService.signUp(signUpRequest),
                FeedbackMessage.SIGNED_UP);
        return ResponseEntity.ok(responseData);
    }

    @PostMapping(ApiPath.LOGIN)
    public ResponseEntity<ResponseData> login(@RequestBody LoginRequest loginRequest) {
        ResponseData responseData = ResponseData.success(authService.login(loginRequest),
                FeedbackMessage.LOGGED_IN);
        return ResponseEntity.ok(responseData);
    }

    @PatchMapping(ApiPath.VERIFY_ACCOUNT)
    public ResponseEntity<ResponseData> verifyAccount(@RequestBody AccountVerificationRequest
                                                              accountVerificationRequest) {
        authService.verifyAccount(accountVerificationRequest);
        ResponseData responseData = ResponseData
                .successWithoutMetaAndData(FeedbackMessage.ACCOUNT_VERIFIED);
        return ResponseEntity.ok(responseData);
    }

    @PostMapping(ApiPath.LOGOUT)
    public ResponseEntity<ResponseData> logout(@Valid @RequestBody LogoutRequest logoutRequest) {
        authService.logout(logoutRequest);
        ResponseData responseData = ResponseData.successWithoutMetaAndData(FeedbackMessage.LOGGED_OUT);
        return ResponseEntity.ok(responseData);
    }

    @PostMapping(ApiPath.REQUEST_PASSWORD_RESET)
    public ResponseEntity<ResponseData> requestPasswordReset(@Valid @RequestBody RequestResetPasswordRequest request) {
        authService.requestResetPassword(request);
        ResponseData responseData = ResponseData.successWithoutMetaAndData(FeedbackMessage.REQUEST_RESET_PASSWORD);
        return ResponseEntity.ok(responseData);
    }


    @PostMapping(ApiPath.VERIFY_OTP)
    public ResponseEntity<ResponseData> verifyOTP(@Valid @RequestBody OtpVerificationRequest request) {
        ResponseData responseData = ResponseData.success(authService.verifyOTP(request),
                FeedbackMessage.REQUEST_RESET_PASSWORD);
        return ResponseEntity.ok(responseData);
    }

    @PostMapping(ApiPath.RESET_PASSWORD)
    public ResponseEntity<ResponseData> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        ResponseData responseData = ResponseData.successWithoutMetaAndData(FeedbackMessage.RESET_PASSWORD);
        return ResponseEntity.ok(responseData);
    }

    @PostMapping(ApiPath.RESEND_RESET_PASSWORD)
    public ResponseEntity<ResponseData> resendResetPassword(@Valid @RequestBody RequestResetPasswordRequest request) {
        authService.resendResetPassword(request);
        ResponseData responseData = ResponseData.successWithoutMetaAndData(FeedbackMessage.RESEND_RESET_PASSWORD);
        return ResponseEntity.ok(responseData);
    }

    @PatchMapping(ApiPath.CHANGE_PASSWORD)
    public ResponseEntity<ResponseData> changePassword(@CurrentUser UserPrincipal userPrincipal,
                                                       @Valid @RequestBody PasswordChangingRequest request) {
        authService.changePassword(userPrincipal.getId(), request);
        ResponseData responseData = ResponseData.successWithoutMetaAndData(FeedbackMessage.PASSWORD_CHANGED);
        return ResponseEntity.ok(responseData);
    }
}
