package com.pbl5.gympose.payload.response.exercise;


import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ExerciseDetailResponse {
    UUID id;
    String thumbnailUrl;
    String name;
    String description;
    String mediaUrl;
    Integer durationMinutes;
    Double met;
    UUID categoryId;
    Boolean isTrainingSupported;
    List<StepRespone> steps;
}
