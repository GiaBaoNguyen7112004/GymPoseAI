package com.pbl5.gympose.service;

import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.payload.request.user.UserUpdatingRequest;
import com.pbl5.gympose.payload.response.user.UserDetailResponse;
import com.pbl5.gympose.payload.response.user.UserResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface UserService {
    User findByEmail(String email);

    User save(User user);

    boolean isExistedUser(String email);

    User findByToken(String token);

    User findById(UUID id);

    UserDetailResponse getProfile(UUID id);

    List<UserResponse> getUsers();

    void deleteUser(UUID id);

    void updateUser(UUID id, UserUpdatingRequest userUpdatingRequest);

    String uploadAvatar(MultipartFile file);

    List<User> findAll();
}
