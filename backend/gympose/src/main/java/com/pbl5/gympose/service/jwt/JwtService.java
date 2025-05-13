package com.pbl5.gympose.service.jwt;


import com.pbl5.gympose.enums.CachePrefix;
import com.pbl5.gympose.exception.UnauthenticatedException;
import com.pbl5.gympose.service.cache.CacheService;
import com.pbl5.gympose.utils.exception.ErrorMessage;
import com.pbl5.gympose.utils.jwt.JwtUtils;
import io.jsonwebtoken.Claims;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class JwtService {
    CacheService cacheService;
    JwtUtils jwtUtils;

    public String refreshToken(String refreshToken) {
        boolean isRefreshToken = true;
        Claims claims = jwtUtils.verifyToken(refreshToken, isRefreshToken);

        if (cacheService.hasKey(CachePrefix.BLACK_LIST_TOKENS.getPrefix() + jwtUtils.getJwtIdFromJWTClaims(claims))) {
            throw new UnauthenticatedException(ErrorMessage.EXPIRED_REFRESH_TOKEN);
        }

        return jwtUtils.generateToken(claims.get(JwtUtils.USERNAME_CLAIM).toString(), isRefreshToken);
    }
}
