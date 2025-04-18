package com.pbl5.gympose.exception.handler;

import com.pbl5.gympose.exception.*;
import com.pbl5.gympose.payload.general.ErrorResponse;
import com.pbl5.gympose.payload.general.ResponseData;
import com.pbl5.gympose.utils.LogUtils;
import com.pbl5.gympose.utils.exception.ErrorMessage;
import com.pbl5.gympose.utils.exception.ErrorUtils;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Hidden
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ResponseData> handlingBadRequestException(BadRequestException ex) {
        ErrorResponse error = ErrorUtils.getExceptionError(ex.getMessage());
        ResponseData responseData = ResponseData.error(error);
        return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ResponseData> handlingUnauthorizedException(UnauthorizedException ex) {
        ErrorResponse error = ErrorUtils.getExceptionError(ex.getMessage());
        ResponseData responseData = ResponseData.error(error);
        return new ResponseEntity<>(responseData, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(UnauthenticatedException.class)
    public ResponseEntity<ResponseData> handlingUnauthenticatedException(UnauthenticatedException ex) {
        ErrorResponse error = ErrorUtils.getExceptionError(ex.getMessage());
        ResponseData responseData = ResponseData.error(error);
        return new ResponseEntity<>(responseData, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ResponseData> handlingNotFoundException(NotFoundException ex) {
        ErrorResponse error = ErrorUtils.getExceptionError(ex.getMessage());
        ResponseData responseData = ResponseData.error(error);
        return new ResponseEntity<>(responseData, HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(InternalServerException.class)
    public ResponseEntity<ResponseData> handlingInternalServerException(InternalServerException ex) {
        ErrorResponse error = ErrorUtils.getExceptionError(ex.getMessage());
        ResponseData responseData = ResponseData.error(error);
        return new ResponseEntity<>(responseData, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseData> handlingMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        List<ObjectError> errors = ex.getBindingResult().getAllErrors();
        LogUtils.info(ex.getMessage());
        List<ErrorResponse> errorResponses = new ArrayList<>();
        errors.stream().forEach(objectError -> {
            String error = ErrorUtils.convertToSnakeCase(Objects.requireNonNull(objectError.getCode()));
            LogUtils.info(error);
            LogUtils.info(objectError.getCode());
            String fieldName = ErrorUtils.convertToSnakeCase(((FieldError) objectError).getField());
            LogUtils.info(((FieldError) objectError).getField());
            String resource = ErrorUtils.convertToSnakeCase(objectError.getObjectName());
            LogUtils.info(objectError.getObjectName());

            ErrorResponse errorResponse = ErrorUtils.getValidationError(resource, fieldName, error);
            errorResponses.add(errorResponse);
        });

        ResponseData responseData = ResponseData.error(errorResponses);

        return new ResponseEntity<>(responseData, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ResponseData> handlingAccessDeniedException(AccessDeniedException ex) {
        ErrorResponse error = ErrorUtils.getExceptionError(ErrorMessage.UNAUTHORIZED);
        ResponseData responseData = ResponseData.error(error);
        return new ResponseEntity<>(responseData, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseData> handlingException(Exception ex) {
        LogUtils.info(ex.getMessage());
        LogUtils.info(ex.getClass().getName());
        ErrorResponse error = ErrorResponse.builder()
                .message(ex.getMessage())
                .build();
        ResponseData responseData = ResponseData.error(error);
        return new ResponseEntity<>(responseData, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
