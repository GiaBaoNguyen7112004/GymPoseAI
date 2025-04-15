package com.pbl5.gympose.payload.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ExerciseUpdatingRequest {
    String thumbnailUrl;
    String name;
    String description;
    String mediaUrl;
    Integer durationMinutes;
    Double met;
    List<StepCreationRequest> steps;
}
