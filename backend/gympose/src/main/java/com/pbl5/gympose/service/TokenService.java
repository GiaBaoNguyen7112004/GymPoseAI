package com.pbl5.gympose.service;

import com.pbl5.gympose.entity.Token;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.enums.TokenType;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TokenService {
    Token findToken(String token);

    Optional<Token> findOtp(UUID userId);

    Token createToken(User user, TokenType type);

    void deleteToken(String token);

    Token findByTokenAndUserId(UUID userId, String token);

    boolean verifyOTP(UUID userId, String token);

    Token save(Token token);

    List<Token> findAllByTypeAndUserId(TokenType type, UUID userId);

    Optional<Token> findByUserIdAndType(UUID userId, TokenType type);
}
