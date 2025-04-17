package com.pbl5.gympose.service.impl;

import com.pbl5.gympose.entity.Token;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.enums.TokenType;
import com.pbl5.gympose.exception.InternalServerException;
import com.pbl5.gympose.exception.NotFoundException;
import com.pbl5.gympose.repository.TokenRepository;
import com.pbl5.gympose.service.TokenService;
import com.pbl5.gympose.utils.exception.ErrorMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TokenServiceImpl implements TokenService {
    TokenRepository tokenRepository;

    @Override
    public Token findToken(String token) {
        return tokenRepository.findByToken(token)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.INVALID_ACCOUNT_VERIFICATION_TOKEN));
    }

    @Override
    public Token createToken(User user, TokenType type) {
        switch (type) {
            case ACCOUNT_VERIFICATION -> {
                Token token = new Token();
                token.setType(TokenType.ACCOUNT_VERIFICATION);
                token.setToken(UUID.randomUUID().toString());
                token.setUser(user);
                return tokenRepository.save(token);
            }
            case RESET_PASSWORD -> {
                Token token = new Token();
                token.setType(TokenType.RESET_PASSWORD);
                token.setToken(UUID.randomUUID().toString());
                token.setUser(user);
                return tokenRepository.save(token);
            }
            case DELETE_ACCOUNT -> {
                Token token = new Token();
                token.setType(TokenType.DELETE_ACCOUNT);
                token.setToken(UUID.randomUUID().toString());
                token.setUser(user);
                return tokenRepository.save(token);
            }
            default -> throw new InternalServerException(ErrorMessage.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public void deleteToken(String token) {
        tokenRepository.deleteTokenByToken(token);
    }
}
