package com.pbl5.gympose.utils;

import com.pbl5.gympose.entity.Exercise;
import com.pbl5.gympose.entity.WorkoutSummary;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;

public class WorkoutUtils {
    private WorkoutUtils() {
    }

    public static Double getCaloriesBase(Double userWeight, Exercise exercise) {
        Double met = exercise.getMet();
        Integer durationMinutes = exercise.getDurationMinutes();

        double calories = Objects.isNull(userWeight)
                ? met * CommonConstant.DEFAULT_WEIGHT * durationMinutes / 60.0
                : met * userWeight * durationMinutes / 60.0;

        return roundToTwoDecimalPlaces(calories);
    }

    public static Double getCaloriesBurned(WorkoutSummary workoutSummary, Double userWeight, Exercise exercise) {
        Double met = exercise.getMet();
        int durationMinutes = workoutSummary.getElapsedTime() / 60;

        double calories = Objects.isNull(userWeight)
                ? met * CommonConstant.DEFAULT_WEIGHT * durationMinutes / 60.0
                : met * userWeight * durationMinutes / 60.0;

        return roundToTwoDecimalPlaces(calories);
    }

    private static Double roundToTwoDecimalPlaces(double value) {
        return BigDecimal.valueOf(value)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
    }
}
