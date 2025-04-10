package com.pbl5.gympose.security.service;

import com.pbl5.gympose.exception.UnauthenticatedException;
import com.pbl5.gympose.exception.message.ErrorMessage;
import com.pbl5.gympose.security.config.AppProperties;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtUtils {
    public static final String ROLES_CLAIM = "roles";
    public static final String USERNAME_CLAIM = "username";
    private final AppProperties appProperties;

    public String generateToken(String username, List<String> roles, boolean isRefreshToken) {
        return Jwts.builder().setSubject(username)
                .claim(ROLES_CLAIM, roles)
                .claim(USERNAME_CLAIM, username)
                .setIssuedAt(new Date())
                .setExpiration(isRefreshToken
                        ? new Date(new Date().getTime() + appProperties.getAuth().getAccessTokenExpirationMsec())
                        : new Date(new Date().getTime() + appProperties.getAuth().getRefreshTokenExpirationMsec()))
                .signWith(isRefreshToken ? getRefreshTokenSecretKey() : getAccessTokenSecretKey(),
                        SignatureAlgorithm.HS512).compact();
    }

    private Key getAccessTokenSecretKey() {
        return Keys.hmacShaKeyFor(Base64.getDecoder().decode(appProperties.getAuth().getAccessTokenSecret()));
    }

    private Key getRefreshTokenSecretKey() {
        return Keys.hmacShaKeyFor(Base64.getDecoder().decode(appProperties.getAuth().getRefreshTokenSecret()));
    }

    public String getUsernameFromJWT(String jwt, boolean isRefreshToken) {
        return Jwts.parserBuilder().setSigningKey(isRefreshToken ? getRefreshTokenSecretKey()
                : getAccessTokenSecretKey()).build().parseClaimsJws(jwt).getBody().getSubject();
    }

    public boolean verifyToken(String token, boolean isRefreshToken) {
        try {
            Jwts.parserBuilder().setSigningKey(getAccessTokenSecretKey()).build().parseClaimsJws(token);

            return true;
        } catch (ExpiredJwtException expiredJwtException) {
            if (isRefreshToken) {
                throw new UnauthenticatedException(ErrorMessage.EXPIRED_REFRESH_TOKEN);
            } else {
                throw new UnauthenticatedException(ErrorMessage.EXPIRED_ACCESS_TOKEN);
            }
        } catch (Exception e) {
            if (isRefreshToken) {
                throw new UnauthenticatedException(ErrorMessage.INVALID_REFRESH_TOKEN);
            } else {
                throw new UnauthenticatedException(ErrorMessage.INVALID_ACCESS_TOKEN);
            }
        }
    }
}
