package com.pbl5.gympose.controller;

import com.pbl5.gympose.payload.general.ResponseData;
import com.pbl5.gympose.payload.request.LoginRequest;
import com.pbl5.gympose.payload.request.SignUpRequest;
import com.pbl5.gympose.service.AuthService;
import com.pbl5.gympose.utils.FeedbackMessage;
import com.pbl5.gympose.utils.UrlMapping;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(UrlMapping.AUTHENTICATION)
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController {
    AuthService authService;

    @PostMapping(UrlMapping.SIGN_UP)
    public ResponseEntity<ResponseData> signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        ResponseData responseData = ResponseData.success(authService.signUp(signUpRequest),
                FeedbackMessage.SIGN_UP_SUCCESS);
        return ResponseEntity.ok(responseData);
    }

    @PostMapping(UrlMapping.LOGIN)
    public ResponseEntity<ResponseData> login(@RequestBody LoginRequest loginRequest) {
        ResponseData responseData = ResponseData.success(authService.login(loginRequest),
                FeedbackMessage.LOGIN_SUCCESS);
        return ResponseEntity.ok(responseData);
    }
}
