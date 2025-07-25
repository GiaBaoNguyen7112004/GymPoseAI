package com.pbl5.gympose.utils;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Random;
import java.util.UUID;

public final class CommonFunction {
    private CommonFunction() {
    }

    public static UUID convertStringToUUID(String input) {
        try {
            return UUID.fromString(input);
        } catch (IllegalArgumentException e) {
            // Trả về null hoặc throw exception tuỳ bạn muốn handle thế nào
            LogUtils.error("cannot convert to UUID");
            return null;
        }
    }

    public static String toJsonString(Object ob) {
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

//    public static LocalDateTime getFromDate(String viewMode) {
//        LocalDateTime now = LocalDateTime.now();
//        return switch (viewMode.toLowerCase()) {
//            case "weekly" -> now.with(DayOfWeek.MONDAY).truncatedTo(ChronoUnit.DAYS);
//            case "monthly" -> now.withDayOfMonth(1).truncatedTo(ChronoUnit.DAYS);
//            case "yearly" -> now.withDayOfYear(1).truncatedTo(ChronoUnit.DAYS);
//            case "all" -> LocalDateTime.of(1970, 1, 1, 0, 0);
//            default -> now.truncatedTo(ChronoUnit.DAYS);
//        };
//    }

    public static LocalDateTime getFromDate(String viewMode) {
        ZoneId vnZone = ZoneId.of("Asia/Ho_Chi_Minh");
        ZonedDateTime nowVn = ZonedDateTime.now(vnZone);

        return switch (viewMode.toLowerCase()) {
            case "weekly" -> nowVn.with(DayOfWeek.MONDAY).truncatedTo(ChronoUnit.DAYS).toLocalDateTime();
            case "monthly" -> nowVn.withDayOfMonth(1).truncatedTo(ChronoUnit.DAYS).toLocalDateTime();
            case "yearly" -> nowVn.withDayOfYear(1).truncatedTo(ChronoUnit.DAYS).toLocalDateTime();
            case "all" -> LocalDateTime.of(1970, 1, 1, 0, 0);
            default -> nowVn.truncatedTo(ChronoUnit.DAYS).toLocalDateTime();
        };
    }
}
