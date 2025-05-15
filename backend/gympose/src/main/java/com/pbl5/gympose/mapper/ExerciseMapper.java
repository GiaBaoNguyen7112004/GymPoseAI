package com.pbl5.gympose.mapper;

import com.pbl5.gympose.entity.Exercise;
import com.pbl5.gympose.payload.request.exercise.ExerciseCreationRequest;
import com.pbl5.gympose.payload.request.exercise.ExerciseUpdatingRequest;
import com.pbl5.gympose.payload.response.exercise.ExerciseDetailResponse;
import com.pbl5.gympose.payload.response.exercise.ExerciseResponse;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, uses = StepMapper.class)
public interface ExerciseMapper {
    Exercise toExercise(ExerciseCreationRequest exerciseCreationRequest);

    ExerciseResponse toExerciseResponse(Exercise exercise);

    @Mapping(target = "steps", ignore = true)
    void updateExercise(@MappingTarget Exercise exercise, ExerciseUpdatingRequest exerciseUpdatingRequest);

    @AfterMapping
    default void afterToExerciseResponse(Exercise exercise, @MappingTarget ExerciseResponse exerciseResponse) {
        if (exercise.getCategory() != null) {
            exerciseResponse.setCategoryId(exercise.getCategory().getId());
        }
    }

    ExerciseDetailResponse toExerciseDetailResponse(Exercise exercise);
}
