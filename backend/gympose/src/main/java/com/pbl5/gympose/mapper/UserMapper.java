package com.pbl5.gympose.mapper;

import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.payload.request.SignUpRequest;
import com.pbl5.gympose.payload.response.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toUserResponse(User user);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "deletedAt", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "avatar", ignore = true)
    @Mapping(target = "gender", ignore = true)
    @Mapping(target = "isEnabled", ignore = true)
    @Mapping(target = "dateOfBirth", ignore = true)
    @Mapping(target = "height", ignore = true)
    @Mapping(target = "weight", ignore = true)
    @Mapping(target = "accountVerificationToken", ignore = true)
    @Mapping(target = "accountVerifiedAt", ignore = true)
    @Mapping(target = "resetPasswordToken", ignore = true)
    @Mapping(target = "requestResetPasswordAt", ignore = true)
    @Mapping(target = "deleteAccountToken", ignore = true)
    @Mapping(target = "requestDeleteAccountAt", ignore = true)
    @Mapping(target = "workoutHistories", ignore = true)
    @Mapping(target = "notifications", ignore = true)
    @Mapping(target = "userProviders", ignore = true)
    User toUser(SignUpRequest signUpRequest);
}
