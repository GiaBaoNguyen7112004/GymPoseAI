package com.pbl5.gympose.service;

import com.pbl5.gympose.payload.request.auth.*;
import com.pbl5.gympose.payload.response.auth.LoginResponse;
import com.pbl5.gympose.payload.response.auth.SignUpResponse;

import java.util.UUID;

public interface AuthService {
    SignUpResponse signUp(SignUpRequest signUpRequest);

    LoginResponse login(LoginRequest loginRequest);

    void verifyAccount(AccountVerificationRequest accountVerificationRequest);

    void logout(LogoutRequest logoutRequest);

    void requestResetPassword(RequestResetPasswordRequest resetPasswordRequest);

    boolean verifyOTP(OtpVerificationRequest otpVerificationRequest);

    void resetPassword(ResetPasswordRequest request);

    void resendResetPassword(RequestResetPasswordRequest resetPasswordRequest);

    void changePassword(UUID userId, PasswordChangingRequest passwordChangingRequest);
}
