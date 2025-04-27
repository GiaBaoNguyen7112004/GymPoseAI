package com.pbl5.gympose.payload.response.workoutsummary;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class WorkoutSummaryDetailResponse {
    UUID id;
    String nameExercise;
    LocalDateTime startTime;
    LocalDateTime endTime;
    Double caloriesBurned;
    Double CaloriesBase;
    String category;
    Integer repCount;
    Integer errorsCount;
}
