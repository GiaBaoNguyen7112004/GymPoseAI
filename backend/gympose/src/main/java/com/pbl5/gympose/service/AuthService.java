package com.pbl5.gympose.service;

import com.pbl5.gympose.payload.request.LoginRequest;
import com.pbl5.gympose.payload.request.SignUpRequest;
import com.pbl5.gympose.payload.response.LoginResponse;
import com.pbl5.gympose.payload.response.SignUpResponse;

public interface AuthService {
    SignUpResponse signUp(SignUpRequest signUpRequest);

    LoginResponse login(LoginRequest loginRequest);
}
