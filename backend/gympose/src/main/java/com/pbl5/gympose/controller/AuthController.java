package com.pbl5.gympose.controller;

import com.pbl5.gympose.payload.general.ResponseData;
import com.pbl5.gympose.payload.request.auth.AccountVerificationRequest;
import com.pbl5.gympose.payload.request.auth.LoginRequest;
import com.pbl5.gympose.payload.request.auth.LogoutRequest;
import com.pbl5.gympose.payload.request.auth.SignUpRequest;
import com.pbl5.gympose.service.AuthService;
import com.pbl5.gympose.utils.ApiPath;
import com.pbl5.gympose.utils.FeedbackMessage;
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
}
