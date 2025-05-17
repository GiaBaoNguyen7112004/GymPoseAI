package com.pbl5.gympose.payload.response.workoutsummary;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class WorkoutSummaryDetailResponse {
    UUID id;
    String name;
    LocalDateTime startTime;
    Integer durationMinutes;
    Integer elapsedTime;
    Double caloriesBurned;
    Double caloriesBase;
    String category;
    Integer repCount;
    Integer errorsCount;
    Double met;
    List<PoseErrorResponse> poseErrors;
}
