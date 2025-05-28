package com.pbl5.gympose.repository;

import com.pbl5.gympose.entity.Token;
import com.pbl5.gympose.enums.TokenType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TokenRepository extends JpaRepository<Token, UUID> {
    Optional<Token> findByToken(String token);

    void deleteTokenByToken(String token);

    Optional<Token> findByTokenAndUserId(String token, UUID userId);

    Optional<Token> findByTypeAndUser_Id(TokenType type, UUID userId);

    List<Token> findAllByTypeAndUser_Id(TokenType type, UUID userId);

    Optional<Token> findByUserIdAndType(UUID userId, TokenType type);
}
