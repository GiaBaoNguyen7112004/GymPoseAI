package com.pbl5.gympose.utils.jwt;

import com.pbl5.gympose.config.app.AppProperties;
import com.pbl5.gympose.exception.UnauthenticatedException;
import com.pbl5.gympose.service.cache.CacheService;
import com.pbl5.gympose.utils.exception.ErrorMessage;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class JwtUtils {
    public static final String USERNAME_CLAIM = "username";
    private final AppProperties appProperties;
    private final CacheService cacheService;

    public String generateToken(String username, boolean isRefreshToken) {
        return Jwts.builder().setSubject(UUID.randomUUID().toString())
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

    public String getUsernameFromJWTClaims(Claims claims) {
        return claims.get(USERNAME_CLAIM, String.class);
    }

    public String getJwtIdFromJWTClaims(Claims claims) {
        return claims.getSubject();
    }

    public Claims verifyToken(String token, boolean isRefreshToken) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(!isRefreshToken ? getAccessTokenSecretKey() : getRefreshTokenSecretKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw new UnauthenticatedException(getExpiredErrorMessage(isRefreshToken));
        } catch (Exception e) {
            throw new UnauthenticatedException(getInvalidErrorMessage(isRefreshToken));
        }
    }

    private String getExpiredErrorMessage(boolean isRefreshToken) {
        return isRefreshToken
                ? ErrorMessage.EXPIRED_REFRESH_TOKEN
                : ErrorMessage.EXPIRED_ACCESS_TOKEN;
    }

    private String getInvalidErrorMessage(boolean isRefreshToken) {
        return isRefreshToken
                ? ErrorMessage.INVALID_REFRESH_TOKEN
                : ErrorMessage.INVALID_ACCESS_TOKEN;
    }

    public Long getTokenAvailableDuration(Claims claims) {
        Date expiration = claims.getExpiration();
        long now = System.currentTimeMillis();

        return expiration.getTime() - now;
    }
}
