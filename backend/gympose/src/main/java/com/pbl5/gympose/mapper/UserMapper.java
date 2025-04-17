package com.pbl5.gympose.mapper;

import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.payload.request.auth.SignUpRequest;
import com.pbl5.gympose.payload.request.user.UserUpdatingRequest;
import com.pbl5.gympose.payload.response.user.UserDetailResponse;
import com.pbl5.gympose.payload.response.user.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {
    UserResponse toUserResponse(User user);

    UserDetailResponse toUserDetailResponse(User user);

    User toUser(SignUpRequest signUpRequest);

    void updateUser(@MappingTarget User user, UserUpdatingRequest userUpdatingRequest);
}
