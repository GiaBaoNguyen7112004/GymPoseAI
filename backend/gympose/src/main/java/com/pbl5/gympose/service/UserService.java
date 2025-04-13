package com.pbl5.gympose.service;

import com.pbl5.gympose.entity.User;

import java.util.UUID;

public interface UserService {
    User findByEmail(String email);

    User save(User user);

    boolean isExistedUser(String email);

    User findByToken(String token);

    User findById(UUID id);
}
