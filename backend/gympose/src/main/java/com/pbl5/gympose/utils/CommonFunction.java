package com.pbl5.gympose.utils;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Random;

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

    public static int getRandomFourDigitNumber() {
        Random random = new Random();
        // Sinh số ngẫu nhiên từ 1000 đến 9999
        return 1000 + random.nextInt(9000); // 9000 vì 9999 - 1000 + 1 = 9000
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
