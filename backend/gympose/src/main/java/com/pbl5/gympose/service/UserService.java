package com.pbl5.gympose.service;

import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.exception.NotFoundException;
import com.pbl5.gympose.exception.message.ErrorMessage;
import com.pbl5.gympose.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException(ErrorMessage.USER_NOT_FOUND));
    }

    public User save(User user) {
        return userRepository.save(user);
    }
}
