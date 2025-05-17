package com.pbl5.gympose.payload.request.auth;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.pbl5.gympose.utils.CommonConstant;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SignUpRequest {
    @NotBlank
    @Email
    String email;

    @NotBlank
    @Size(min = 1, max = 100)
    String firstName;

    @NotBlank
    @Size(min = 1, max = 100)
    String lastName;

    @NotBlank
    @Pattern(regexp = CommonConstant.PASSWORD_RULE)
    String password;
}
