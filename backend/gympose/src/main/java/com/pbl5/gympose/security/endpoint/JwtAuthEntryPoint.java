package com.pbl5.gympose.security.endpoint;

import com.pbl5.gympose.payload.general.ErrorResponse;
import com.pbl5.gympose.payload.general.ResponseData;
import com.pbl5.gympose.utils.CommonFunction;
import com.pbl5.gympose.utils.LogUtils;
import com.pbl5.gympose.utils.exception.ErrorMessage;
import com.pbl5.gympose.utils.exception.ErrorUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Objects;

@Component
public class JwtAuthEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                         AuthenticationException authException) throws IOException, ServletException {
        String authHeader = httpServletRequest.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            httpServletResponse.setContentType("application/json");
            httpServletResponse.setCharacterEncoding("UTF-8");
            LogUtils.info(authException.getLocalizedMessage());
            LogUtils.info(authException.getMessage());
            ErrorResponse error = ErrorUtils.getExceptionError(ErrorMessage.MISSING_JWT);
            ResponseData responseData = ResponseData.error(error);

            LogUtils.error(
                    httpServletRequest.getMethod(),
                    httpServletRequest.getRequestURL().toString(),
                    authException.getMessage());

            httpServletResponse
                    .getWriter()
                    .write(Objects.requireNonNull(CommonFunction.toJsonString(responseData)));
        } else {
            httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            httpServletResponse.setContentType("application/json");
            httpServletResponse.setCharacterEncoding("UTF-8");
            LogUtils.info(authException.getLocalizedMessage());
            LogUtils.info(authException.getMessage());
            ErrorResponse error = ErrorUtils.getExceptionError(ErrorMessage.UNAUTHENTICATED);
            ResponseData responseData = ResponseData.error(error);

            LogUtils.error(
                    httpServletRequest.getMethod(),
                    httpServletRequest.getRequestURL().toString(),
                    authException.getMessage());

            httpServletResponse
                    .getWriter()
                    .write(Objects.requireNonNull(CommonFunction.toJsonString(responseData)));
        }
    }
}
