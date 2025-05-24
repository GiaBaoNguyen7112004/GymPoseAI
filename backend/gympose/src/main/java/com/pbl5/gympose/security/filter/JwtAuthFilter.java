package com.pbl5.gympose.security.filter;

import com.pbl5.gympose.exception.UnauthenticatedException;
import com.pbl5.gympose.payload.general.ErrorResponse;
import com.pbl5.gympose.payload.general.ResponseData;
import com.pbl5.gympose.service.security.CustomUserDetailsService;
import com.pbl5.gympose.utils.CommonFunction;
import com.pbl5.gympose.utils.LogUtils;
import com.pbl5.gympose.utils.exception.ErrorMessage;
import com.pbl5.gympose.utils.exception.ErrorUtils;
import com.pbl5.gympose.utils.jwt.JwtUtils;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtUtils jwtUtils;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        String token = parseJwt(request);
        try {
            LogUtils.info(request.getRequestURI());
            if (StringUtils.hasText(token)) {
                Claims claims = jwtUtils.verifyToken(token, false);
                UserDetails userDetails = customUserDetailsService
                        .loadUserByUsername(jwtUtils.getUsernameFromJWTClaims(claims));
                var authentication = new UsernamePasswordAuthenticationToken(userDetails,
                        null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            filterChain.doFilter(request, response);
        } catch (UnauthenticatedException unauthenticatedException) {
            if (!StringUtils.hasText(token)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                ErrorResponse error = ErrorUtils.getExceptionError(ErrorMessage.MISSING_JWT);
                ResponseData responseData = ResponseData.error(error);
                response
                        .getWriter()
                        .write(Objects.requireNonNull(CommonFunction.toJsonString(responseData)));
                return;
            }
            LogUtils.error(request.getMethod(), request.getRequestURL().toString(), unauthenticatedException.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            ErrorResponse error = ErrorUtils.getExceptionError(unauthenticatedException.getMessage());
            ResponseData responseData = ResponseData.error(error);
            response
                    .getWriter()
                    .write(Objects.requireNonNull(CommonFunction.toJsonString(responseData)));
        } catch (Exception exception) {
            LogUtils.error(request.getMethod(), request.getRequestURL().toString(), exception.getMessage());
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            ErrorResponse error = ErrorUtils.getExceptionError(ErrorMessage.INTERNAL_SERVER_ERROR);
            ResponseData responseData = ResponseData.error(error);
            response
                    .getWriter()
                    .write(Objects.requireNonNull(CommonFunction.toJsonString(responseData)));
        }
    }

    public String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        } else return null;
    }
}
