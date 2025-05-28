package com.pbl5.gympose.service.impl;

import com.pbl5.gympose.entity.Token;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.enums.TokenType;
import com.pbl5.gympose.exception.BadRequestException;
import com.pbl5.gympose.exception.InternalServerException;
import com.pbl5.gympose.exception.NotFoundException;
import com.pbl5.gympose.repository.TokenRepository;
import com.pbl5.gympose.service.TokenService;
import com.pbl5.gympose.utils.CommonFunction;
import com.pbl5.gympose.utils.exception.ErrorMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TokenServiceImpl implements TokenService {
    TokenRepository tokenRepository;

    @Override
    public Token findToken(String token) {
        return tokenRepository.findByToken(token)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.TOKEN_NOT_FOUND));
    }

    @Override
    public Optional<Token> findOtp(UUID userId) {
        return tokenRepository.findByTypeAndUser_Id(TokenType.RESET_PASSWORD, userId);
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
                token.setToken(String.valueOf(CommonFunction.getRandomFourDigitNumber()));
                token.setExpireTime(LocalDateTime.now().plusMinutes(5));
                token.setUser(user);
                return tokenRepository.save(token);
            }
            case DELETE_ACCOUNT -> {
                Token token = new Token();
                token.setType(TokenType.DELETE_ACCOUNT);
                token.setToken(UUID.randomUUID().toString());
                token.setExpireTime(LocalDateTime.now().plusMinutes(5));
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

    @Override
    public Token findByTokenAndUserId(UUID userId, String token) {
        return tokenRepository.findByTokenAndUserId(token, userId).orElseThrow(()
                -> new NotFoundException(ErrorMessage.TOKEN_NOT_FOUND));
    }

    @Override
    public boolean verifyOTP(UUID userId, String token) {
        Token tokenEntity = findByTokenAndUserId(userId, token);
        if (tokenEntity == null)
            throw new BadRequestException(ErrorMessage.INVALID_OTP);
        if (tokenEntity.getExpireTime().isBefore(LocalDateTime.now()))
            throw new BadRequestException(ErrorMessage.EXPIRED_OTP);
        return true;
    }

    @Override
    public Token save(Token token) {
        return tokenRepository.save(token);
    }

    @Override
    public List<Token> findAllByTypeAndUserId(TokenType type, UUID userId) {
        return tokenRepository.findAllByTypeAndUser_Id(type, userId);
    }

    @Override
    public Optional<Token> findByUserIdAndType(UUID userId, TokenType type) {
        return tokenRepository.findByUserIdAndType(userId, type);
    }
}
