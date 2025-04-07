package com.pbl5.gympose.utils;

import com.fasterxml.jackson.databind.ObjectMapper;

public final class CommonFunction {
    private CommonFunction() {
    }

    public static String convertToJSON(Object ob) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(ob);
        } catch (Exception e) {
            LogUtils.error(e.getMessage());
            return null;
        }
    }
}
