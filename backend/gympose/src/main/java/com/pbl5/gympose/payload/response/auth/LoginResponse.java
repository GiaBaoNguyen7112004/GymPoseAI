package com.pbl5.gympose.payload.response.auth;


import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.pbl5.gympose.payload.response.user.UserDetailResponse;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginResponse {
    UserDetailResponse user;

    public LoginResponse(UserDetailResponse user) {
        this.user = user;
    }
}
