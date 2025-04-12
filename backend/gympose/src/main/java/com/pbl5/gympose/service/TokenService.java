package com.pbl5.gympose.service;

import com.pbl5.gympose.entity.Token;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.enums.TokenType;

public interface TokenService {
    Token findToken(String token);

    Token createToken(User user, TokenType type);

    void deleteToken(String token);
}
