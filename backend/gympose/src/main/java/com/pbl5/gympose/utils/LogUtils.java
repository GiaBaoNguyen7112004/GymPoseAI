package com.pbl5.gympose.utils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public final class LogUtils {
    private LogUtils() {
    }

    public static void error(String method, String uri, String error) {
        String content = method + "/" + uri + " - " + "Error: " + error;
        log.error(content);
    }

    public static void error(String content) {
        log.error(content);
    }

    public static void info(String content) {
        log.info(content);
    }

    public static void warn(String content) {
        log.warn(content);
    }

    public static void debug(String content) {
        log.debug(content);
    }
}
