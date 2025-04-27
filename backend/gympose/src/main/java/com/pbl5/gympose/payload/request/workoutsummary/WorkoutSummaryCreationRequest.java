package com.pbl5.gympose.payload.request.workoutsummary;


import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WorkoutSummaryCreationRequest {
    UUID userId;
    UUID exerciseId;
    LocalDateTime startTime;
    LocalDateTime endTime;
    Integer repCount;
    List<PoseErrorCreationRequest> poseErrors;
}
