package com.pbl5.gympose.payload.response.auth;


import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.pbl5.gympose.payload.response.user.UserResponse;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JwtLoginResponse extends LoginResponse {
    String accessToken;
    String refreshToken;

    public JwtLoginResponse(UserResponse userResponse, String accessToken, String refreshToken) {
        super(userResponse);
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
