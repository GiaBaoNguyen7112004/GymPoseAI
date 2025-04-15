package com.pbl5.gympose.service;

import com.pbl5.gympose.payload.request.ExerciseCreationRequest;
import com.pbl5.gympose.payload.request.ExerciseUpdatingRequest;
import com.pbl5.gympose.payload.response.ExerciseDetailResponse;
import com.pbl5.gympose.payload.response.ExerciseResponse;

import java.util.List;
import java.util.UUID;

public interface ExerciseService {
    ExerciseResponse createExercise(UUID categoryId, ExerciseCreationRequest exerciseCreationRequest);

    List<ExerciseResponse> getExercisesByCategoryId(UUID categoryId);

    List<ExerciseResponse> getAllExercises();

    ExerciseDetailResponse getExerciseById(UUID exerciseId);

    ExerciseDetailResponse updateExerciseById(UUID exerciseId, ExerciseUpdatingRequest exerciseUpdatingRequest);

    void deleteExerciseById(UUID exerciseId);
}
