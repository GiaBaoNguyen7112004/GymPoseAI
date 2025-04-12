package com.pbl5.gympose.service;

import com.pbl5.gympose.entity.User;

public interface UserService {
    User findByEmail(String email);

    User save(User user);

    boolean isExistedUser(String email);

    User findByToken(String token);
}
