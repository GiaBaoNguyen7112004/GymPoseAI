package com.pbl5.gympose.mapper;

import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.payload.request.auth.SignUpRequest;
import com.pbl5.gympose.payload.request.user.UserUpdatingRequest;
import com.pbl5.gympose.payload.response.user.UserDetailResponse;
import com.pbl5.gympose.payload.response.user.UserResponse;
import org.mapstruct.*;

import java.util.Objects;
import java.util.stream.Stream;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {
    UserResponse toUserResponse(User user);

    UserDetailResponse toUserDetailResponse(User user);

    User toUser(SignUpRequest signUpRequest);

    void updateUser(@MappingTarget User user, UserUpdatingRequest userUpdatingRequest);

    default boolean isProfileComplete(User user) {
        return Stream.of(
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getDateOfBirth(),
                user.getHeight(),
                user.getWeight(),
                user.getGender()
        ).allMatch(Objects::nonNull);
    }

    @AfterMapping
    default void afterToUserResponse(User user, @MappingTarget UserResponse response) {
        response.setIsProfileComplete(isProfileComplete(user));
    }

    // AfterMapping cho toUserDetailResponse
    @AfterMapping
    default void afterToUserDetailResponse(User user, @MappingTarget UserDetailResponse response) {
        response.setIsProfileComplete(isProfileComplete(user));
    }
}
