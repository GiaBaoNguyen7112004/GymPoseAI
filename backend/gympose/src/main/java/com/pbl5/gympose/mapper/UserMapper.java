package com.pbl5.gympose.mapper;

import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.payload.request.SignUpRequest;
import com.pbl5.gympose.payload.response.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    UserResponse toUserResponse(User user);

    User toUser(SignUpRequest signUpRequest);
}
