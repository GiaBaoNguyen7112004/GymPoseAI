package com.pbl5.gympose.security.filter;

import com.pbl5.gympose.exception.handler.ErrorUtils;
import com.pbl5.gympose.exception.message.ErrorMessage;
import com.pbl5.gympose.exception.response.ErrorResponse;
import com.pbl5.gympose.payload.general.ResponseData;
import com.pbl5.gympose.utils.CommonFunction;
import com.pbl5.gympose.utils.LogUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;
import java.util.Objects;

public class JwtAuthEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                         AuthenticationException authException) throws IOException, ServletException {
        httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        httpServletResponse.setContentType("application/json");
        httpServletResponse.setCharacterEncoding("UTF-8");

        ErrorResponse error = ErrorUtils.getExceptionError(ErrorMessage.UNAUTHENTICATED);
        ResponseData responseData = ResponseData.error(error);

        LogUtils.error(
                httpServletRequest.getMethod(),
                httpServletRequest.getRequestURL().toString(),
                authException.getMessage());

        httpServletResponse
                .getWriter()
                .write(Objects.requireNonNull(CommonFunction.convertToJSON(responseData)));
    }
}
