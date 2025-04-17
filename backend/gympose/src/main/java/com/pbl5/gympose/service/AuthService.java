package com.pbl5.gympose.service;

import com.pbl5.gympose.payload.request.auth.AccountVerificationRequest;
import com.pbl5.gympose.payload.request.auth.LoginRequest;
import com.pbl5.gympose.payload.request.auth.LogoutRequest;
import com.pbl5.gympose.payload.request.auth.SignUpRequest;
import com.pbl5.gympose.payload.response.auth.LoginResponse;
import com.pbl5.gympose.payload.response.auth.SignUpResponse;

public interface AuthService {
    SignUpResponse signUp(SignUpRequest signUpRequest);

    LoginResponse login(LoginRequest loginRequest);

    void verifyAccount(AccountVerificationRequest accountVerificationRequest);

    void logout(LogoutRequest logoutRequest);
}
