package com.pbl5.gympose.service.impl;

import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.exception.NotFoundException;
import com.pbl5.gympose.mapper.UserMapper;
import com.pbl5.gympose.payload.request.user.UserUpdatingRequest;
import com.pbl5.gympose.payload.response.user.UserDetailResponse;
import com.pbl5.gympose.payload.response.user.UserResponse;
import com.pbl5.gympose.repository.UserRepository;
import com.pbl5.gympose.service.TokenService;
import com.pbl5.gympose.service.UserService;
import com.pbl5.gympose.service.storage.StorageService;
import com.pbl5.gympose.utils.exception.ErrorMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    TokenService tokenService;
    UserMapper userMapper;
    StorageService storageService;

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException(ErrorMessage.USER_NOT_FOUND));
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public boolean isExistedUser(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @Override
    public User findByToken(String token) {
        return tokenService.findToken(token).getUser();
    }

    @Override
    public User findById(UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException(ErrorMessage.USER_NOT_FOUND));
    }

    @Override
    public UserDetailResponse getProfile(UUID id) {
        return userMapper.toUserDetailResponse(findById(id));
    }

    @Override
    public List<UserResponse> getUsers() {
        return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
    }

    @Override
    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }

    @Override
    public void updateUser(UUID id, UserUpdatingRequest userUpdatingRequest) {
        User user = findById(id);
        userMapper.updateUser(user, userUpdatingRequest);
        userRepository.save(user);
    }

    @Override
    public String uploadAvatar(MultipartFile file) {
        return storageService.uploadPicture(file, "avatars", false);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }
}

