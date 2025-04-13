package com.pbl5.gympose.utils;

public final class UrlMapping {
    //    API
    public static final String API = "/api/v1";

    //    AUTHENTICATION
    public static final String AUTHENTICATION = API + "/auth";
    public static final String SIGN_UP = "/sign-up";
    public static final String LOGIN = "/login";
    public static final String VERIFY_ACCOUNT = "/verify-account";

    //  CATEGORY
    public static final String CATEGORIES = API + "/categories";
    public static final String CATEGORY_UPDATE = "/{category-id}";
    public static final String CATEGORY_GET_BY_ID = "/{category-id}";
    public static final String CATEGORY_DELETE_BY_ID = "/{category-id}";
    public static final String CATEGORY_GET_ALL = "";
    public static final String CATEGORY_CREATE = "";

    private UrlMapping() {
    }
}
