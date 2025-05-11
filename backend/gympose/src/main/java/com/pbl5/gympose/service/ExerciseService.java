package com.pbl5.gympose.service;

import com.pbl5.gympose.entity.Exercise;
import com.pbl5.gympose.payload.request.exercise.ExerciseCreationRequest;
import com.pbl5.gympose.payload.request.exercise.ExerciseUpdatingRequest;
import com.pbl5.gympose.payload.response.exercise.ExerciseDetailResponse;
import com.pbl5.gympose.payload.response.exercise.ExerciseResponse;

import java.util.List;
import java.util.UUID;

public interface ExerciseService {
    ExerciseResponse createExercise(UUID categoryId, ExerciseCreationRequest exerciseCreationRequest);

    List<ExerciseResponse> getExercisesByCategoryId(UUID categoryId);

    List<ExerciseResponse> getAllExercises();

    ExerciseDetailResponse getExerciseById(UUID exerciseId);

    ExerciseDetailResponse updateExerciseById(UUID exerciseId, ExerciseUpdatingRequest exerciseUpdatingRequest);

    void deleteExerciseById(UUID exerciseId);

    Exercise findById(UUID id);

    List<ExerciseResponse> searchByName(String query, String type);
}
