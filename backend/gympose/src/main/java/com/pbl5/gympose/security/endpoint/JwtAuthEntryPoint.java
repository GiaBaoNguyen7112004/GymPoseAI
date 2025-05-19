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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.io.IOException;
import java.util.Objects;

@Component
public class JwtAuthEntryPoint implements AuthenticationEntryPoint {
    @Autowired
    ApplicationContext applicationContext;

    @Override
    public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                         AuthenticationException authException) throws IOException, ServletException {
        if (isUrlNotFound(httpServletRequest)) {
            httpServletResponse.setStatus(HttpServletResponse.SC_NOT_FOUND);
            httpServletResponse.setContentType("application/json");
            httpServletResponse.setCharacterEncoding("UTF-8");
            LogUtils.info(authException.getLocalizedMessage());
            LogUtils.info(authException.getMessage());
            ErrorResponse error = ErrorUtils.getExceptionError(ErrorMessage.URL_NOT_FOUND);
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

    private boolean isUrlNotFound(HttpServletRequest request) {
        try {
            // Lấy tất cả các endpoint đã đăng ký
            RequestMappingHandlerMapping handlerMapping = applicationContext.getBean(RequestMappingHandlerMapping.class);
            return handlerMapping.getHandler(request) == null;
        } catch (Exception e) {
            return true;
        }
    }
}
