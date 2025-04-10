package com.pbl5.gympose.exception.message;

public final class ErrorMessage {
    //Authentication
    public static final String UNAUTHENTICATED = "unauthenticated";
    public static final String UNAUTHORIZED = "unauthorized";
    public static final String INCORRECT_EMAIL_OR_PASSWORD = "incorrect_email_or_password";
    public static final String ACCOUNT_NOT_EXISTED = "account_not_existed";
    public static final String ACCOUNT_LOCKED = "account_locked";
    public static final String ACCOUNT_NOT_ACTIVE = "account_not_active";

    //Internal server error
    public static final String INTERNAL_SERVER_ERROR = "internal_server_error";

    //Token
    public static final String INVALID_ACCESS_TOKEN = "invalid_access_token";
    public static final String EXPIRED_ACCESS_TOKEN = "expired_access_token";
    public static final String INVALID_REFRESH_TOKEN = "invalid_refresh_token";
    public static final String EXPIRED_REFRESH_TOKEN = "expired_refresh_token";

    //User
    public static final String USER_NOT_FOUND = "user_not_found";

    private ErrorMessage() {
    }
}
