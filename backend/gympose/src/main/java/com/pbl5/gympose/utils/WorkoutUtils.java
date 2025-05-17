package com.pbl5.gympose.utils;

import com.pbl5.gympose.entity.Exercise;
import com.pbl5.gympose.entity.WorkoutSummary;

import java.util.Objects;

public class WorkoutUtils {
    private WorkoutUtils() {
    }

    public static Double getCaloriesBase(Double userWeight, Exercise exercise) {
        Double met = exercise.getMet();
        Integer durationMinutes = exercise.getDurationMinutes();

        return Objects.isNull(userWeight) ? met * CommonConstant.DEFAULT_WEIGHT * durationMinutes / 60.0
                : met * userWeight * durationMinutes / 60.0;
    }

    public static Double getCaloriesBurned(WorkoutSummary workoutSummary, Double userWeight, Exercise exercise) {
        Double met = exercise.getMet();
        int durationMinutes = workoutSummary.getElapsedTime() / 60;

        return Objects.isNull(userWeight) ? met * CommonConstant.DEFAULT_WEIGHT * durationMinutes / 60.0
                : met * userWeight * durationMinutes / 60.0;
    }
}
