package com.pbl5.gympose.payload.response.user;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.pbl5.gympose.enums.AuthProvider;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class UserProviderResponse {
    UUID id;
    AuthProvider authProvider;
    String providerId;
}
