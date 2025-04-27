package com.pbl5.gympose.utils;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

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

    public static LocalDateTime getFromDate(String viewMode) {
        LocalDateTime now = LocalDateTime.now();
        return switch (viewMode.toLowerCase()) {
            case "weekly" -> now.with(DayOfWeek.MONDAY).truncatedTo(ChronoUnit.DAYS);
            case "monthly" -> now.withDayOfMonth(1).truncatedTo(ChronoUnit.DAYS);
            case "yearly" -> now.withDayOfYear(1).truncatedTo(ChronoUnit.DAYS);
            default -> now.truncatedTo(ChronoUnit.DAYS);
        };
    }
}
