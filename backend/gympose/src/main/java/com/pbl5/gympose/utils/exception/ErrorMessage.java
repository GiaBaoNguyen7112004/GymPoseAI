package com.pbl5.gympose.utils.exception;

public final class ErrorMessage {
    //Authentication
    public static final String UNAUTHENTICATED = "unauthenticated";
    public static final String UNAUTHORIZED = "unauthorized";
    public static final String INCORRECT_EMAIL_OR_PASSWORD = "incorrect_email_or_password";
    public static final String ACCOUNT_NOT_EXISTED = "account_not_existed";
    public static final String ACCOUNT_LOCKED = "account_locked";
    public static final String ACCOUNT_NOT_ACTIVE = "account_not_active";
    public static final String ACCOUNT_ALREADY_ACTIVE = "account_already_active";

    //Internal server error
    public static final String INTERNAL_SERVER_ERROR = "internal_server_error";

    //Token
    public static final String INVALID_ACCESS_TOKEN = "invalid_access_token";
    public static final String EXPIRED_ACCESS_TOKEN = "expired_access_token";
    public static final String INVALID_REFRESH_TOKEN = "invalid_refresh_token";
    public static final String EXPIRED_REFRESH_TOKEN = "expired_refresh_token";
    public static final String INVALID_ACCOUNT_VERIFICATION_TOKEN = "invalid_account_verification_token";
    public static final String EXPIRED_ACCOUNT_VERIFICATION_TOKEN = "expired_account_verification_token";

    //User
    public static final String USER_NOT_FOUND = "user_not_found";
    public static final String USER_ALREADY_EXISTED = "user_already_existed";


    //Category
    public static final String CATEGORY_NOT_FOUND = "category_not_found";

    //Exercise
    public static final String EXERCISE_NOT_FOUND = "exercise_not_found";

    //FILE
    public static final String FILE_DELETE_FAILED = "file_delete_failed";
    public static final String FILE_SIZE_EXCEEDED = "file_size_exceeded";
    public static final String FILE_NOT_FORMATTED = "file_not_formatted";

    //IMAGE
    public static final String IMAGE_DELETE_FAILED = "image_delete_failed";

    private ErrorMessage() {
    }
}
