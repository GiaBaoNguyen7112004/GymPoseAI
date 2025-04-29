package com.pbl5.gympose.utils;

public final class ApiPath {
    public static final String API = "/api/v1";

    // AUTH
    public static final String AUTH = API + "/auth";
    public static final String SIGN_UP = "/sign-up";
    public static final String LOGIN = "/login";
    public static final String VERIFY_ACCOUNT = "/verify-account";
    public static final String LOGOUT = "/logout";
    public static final String REQUEST_PASSWORD_RESET = "/request-password-reset";
    public static final String VERIFY_OTP = "/verify-reset-otp";
    public static final String RESET_PASSWORD = "/reset-password";
    public static final String RESEND_RESET_PASSWORD = "resend-reset-otp";
    public static final String CHANGE_PASSWORD = "/change-password";

    // CATEGORY
    public static final String CATEGORIES = API + "/categories";
    public static final String CATEGORY_BY_ID = "/{category-id}";

    // EXERCISE
    public static final String EXERCISES = API + "/exercises";
    public static final String EXERCISE_BY_ID = "/{exercise-id}";

    // IMAGE
    public static final String UPLOAD_IMAGE = "/upload-image";

    //CATEGORY'S EXERCISES
    public static final String CATEGORY_EXERCISES = API + "/categories/{category-id}/exercises";

    // USER
    public static final String USERS = API + "/users";
    public static final String USER_BY_ID = "/{user-id}";
    public static final String USER_PROFILE = "/profile";

    // WORKOUT SUMMARY
    public static final String WORKOUT_SUMMARY = API + "/workout-summary";
    public static final String WORKOUT_SUMMARY_BY_ID = "/{workout-summary-id}";
    public static final String WORKOUT_SUMMARY_HISTORY = "/history";
    public static final String WORKOUT_STATISTICS = "/statistics";

    // NOTIFICATION
    public static final String NOTIFICATIONS = API + "/notifications";
    public static final String NOTIFICATION_BY_ID = "/{notification-id}";

    //JWT
    public static final String JWT = API + "/jwt";
    public static final String JWT_REFRESH = "/refresh";

    //TARGET
    public static final String TARGET = API + "/target";
    public static final String TARGET_TODAY = "/today";
    public static final String TARGET_CALORIES_TODAY = TARGET_TODAY + "/calories";
    public static final String TARGET_WEEKLY = "/weekly";

    // SWAGGER
    public static final String SWAGGER = "/swagger-ui.html";

    private ApiPath() {
    }
}
