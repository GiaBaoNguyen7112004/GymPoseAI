package com.pbl5.gympose.service.impl;

import com.pbl5.gympose.entity.Category;
import com.pbl5.gympose.entity.Exercise;
import com.pbl5.gympose.entity.Step;
import com.pbl5.gympose.exception.NotFoundException;
import com.pbl5.gympose.mapper.ExerciseMapper;
import com.pbl5.gympose.mapper.StepMapper;
import com.pbl5.gympose.payload.request.exercise.ExerciseCreationRequest;
import com.pbl5.gympose.payload.request.exercise.ExerciseUpdatingRequest;
import com.pbl5.gympose.payload.response.exercise.ExerciseDetailResponse;
import com.pbl5.gympose.payload.response.exercise.ExerciseResponse;
import com.pbl5.gympose.repository.ExerciseRepository;
import com.pbl5.gympose.service.CategoryService;
import com.pbl5.gympose.service.ExerciseService;
import com.pbl5.gympose.utils.exception.ErrorMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ExerciseServiceImpl implements ExerciseService {
    CategoryService categoryService;
    ExerciseMapper exerciseMapper;
    ExerciseRepository exerciseRepository;
    StepMapper stepMapper;


    @Override
    public ExerciseResponse createExercise(UUID categoryId, ExerciseCreationRequest exerciseCreationRequest) {
        Category category = categoryService.findById(categoryId);
        Exercise exercise = exerciseMapper.toExercise(exerciseCreationRequest);
        exercise.setCategory(category);

        category.getExercises().add(exercise);

        return exerciseMapper.toExerciseResponse(exerciseRepository.save(exercise));
    }

    @Override
    public List<ExerciseResponse> getExercisesByCategoryId(UUID categoryId) {
        return exerciseRepository.findByCategoryId(categoryId).stream()
                .map(exerciseMapper::toExerciseResponse).toList();
    }

    @Override
    public List<ExerciseResponse> getAllExercises() {
        return exerciseRepository.findAll().stream().map(exerciseMapper::toExerciseResponse).toList();
    }

    @Override
    public ExerciseDetailResponse getExerciseById(UUID exerciseId) {
        return exerciseRepository.findById(exerciseId).map(exerciseMapper::toExerciseDetailResponse)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.EXERCISE_NOT_FOUND));
    }

    @Override
    public ExerciseDetailResponse updateExerciseById(UUID exerciseId, ExerciseUpdatingRequest exerciseUpdatingRequest) {
        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.EXERCISE_NOT_FOUND));
        exerciseMapper.updateExercise(exercise, exerciseUpdatingRequest);

        if (exerciseUpdatingRequest.getSteps() != null) {
            exercise.getSteps().clear();
            List<Step> steps = exerciseUpdatingRequest.getSteps().stream()
                    .map(stepCreationRequest -> {
                        Step step = stepMapper.toStep(stepCreationRequest);
                        step.setExercise(exercise);
                        return step;
                    }).toList();
            exercise.getSteps().addAll(steps);
        }

        return exerciseMapper.toExerciseDetailResponse(exerciseRepository.save(exercise));
    }

    @Override
    public void deleteExerciseById(UUID exerciseId) {
        exerciseRepository.deleteById(exerciseId);
    }

    @Override
    public Exercise findById(UUID id) {
        return exerciseRepository.findById(id).orElseThrow(() -> new NotFoundException(ErrorMessage.EXERCISE_NOT_FOUND));
    }

    @Override
    public List<ExerciseResponse> searchByName(String query, String type) {
        return exerciseRepository.searchByName(buildFullTextQuery(query), type)
                .stream().map(exerciseMapper::toExerciseResponse).toList();
    }

    public String buildFullTextQuery(String query) {
        if (query == null || query.trim().isEmpty()) {
            return ""; // hoặc throw exception nếu cần
        }

        query = query.trim();

        if (query.contains(" ")) {
            return Arrays.stream(query.split("\\s+"))
                    .map(word -> word + ":*")
                    .collect(Collectors.joining(" & "));
        } else {
            return query + ":*";
        }
    }
}
