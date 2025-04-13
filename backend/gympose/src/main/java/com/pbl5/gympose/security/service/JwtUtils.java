package com.pbl5.gympose.security.service;

import com.pbl5.gympose.cache.CachePrefix;
import com.pbl5.gympose.cache.CacheService;
import com.pbl5.gympose.config.AppProperties;
import com.pbl5.gympose.exception.UnauthenticatedException;
import com.pbl5.gympose.exception.message.ErrorMessage;
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
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class JwtUtils {
    public static final String ROLES_CLAIM = "roles";
    public static final String USERNAME_CLAIM = "username";
    private final AppProperties appProperties;
    private final CacheService cacheService;

    public String generateToken(String username, List<String> roles, boolean isRefreshToken) {
        return Jwts.builder().setSubject(UUID.randomUUID().toString())
                .claim(USERNAME_CLAIM, username)
                .claim(ROLES_CLAIM, roles)
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

    public String getUsernameFromJWT(Claims claims) {
        return claims.get(USERNAME_CLAIM, String.class);
    }

    public String getJwtIdFromJWT(Claims claims) {
        return claims.getSubject();
    }

    public Claims verifyToken(String token, boolean isRefreshToken) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(!isRefreshToken ? getAccessTokenSecretKey() : getRefreshTokenSecretKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            if (cacheService.hasKey(CachePrefix.BLACK_LIST_TOKENS.getPrefix() + getJwtIdFromJWT(claims))) {
                throw new ExpiredJwtException(null, null, null);
            }
            return claims;
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
