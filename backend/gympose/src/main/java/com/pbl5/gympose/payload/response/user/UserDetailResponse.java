package com.pbl5.gympose.payload.response.user;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.pbl5.gympose.enums.Gender;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserDetailResponse {
    UUID id;
    String email;
    String avatar;
    String firstName;
    String lastName;
    Gender gender;
    Boolean isEnabled = false;
    LocalDate dateOfBirth;
    Double height;
    Double weight;
    List<UserProviderResponse> userProviders;
    List<RoleResponse> roles;
}
