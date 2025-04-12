package com.pbl5.gympose.service.implement;

import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.exception.NotFoundException;
import com.pbl5.gympose.exception.message.ErrorMessage;
import com.pbl5.gympose.repository.UserRepository;
import com.pbl5.gympose.service.TokenService;
import com.pbl5.gympose.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    TokenService tokenService;

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
}

