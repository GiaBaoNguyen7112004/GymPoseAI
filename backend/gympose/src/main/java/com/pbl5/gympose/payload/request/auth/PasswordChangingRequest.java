package com.pbl5.gympose.payload.request.auth;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.pbl5.gympose.utils.CommonConstant;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PasswordChangingRequest {
    @NotBlank
    String oldPassword;

    @NotBlank
    @Pattern(regexp = CommonConstant.PASSWORD_RULE)
    String newPassword;

    @NotBlank
    @Pattern(regexp = CommonConstant.PASSWORD_RULE)
    String newPasswordConfirmation;
}
