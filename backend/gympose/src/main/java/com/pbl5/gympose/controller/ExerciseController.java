package com.pbl5.gympose.controller;

import com.pbl5.gympose.payload.general.ResponseData;
import com.pbl5.gympose.payload.request.exercise.ExerciseCreationRequest;
import com.pbl5.gympose.payload.request.exercise.ExerciseUpdatingRequest;
import com.pbl5.gympose.service.ExerciseService;
import com.pbl5.gympose.service.storage.StorageService;
import com.pbl5.gympose.utils.ApiPath;
import com.pbl5.gympose.utils.FeedbackMessage;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Exercise API", description = "Exercise management")
public class ExerciseController {
    ExerciseService exerciseService;
    StorageService storageService;

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(ApiPath.CATEGORY_EXERCISES)
    public ResponseEntity<ResponseData> createExercise(@PathVariable(name = "category-id") UUID categoryId,
                                                       @RequestBody @Valid ExerciseCreationRequest request) {
        ResponseData responseData = ResponseData.success(exerciseService.createExercise(categoryId, request),
                FeedbackMessage.EXERCISE_CREATED);
        return ResponseEntity.ok(responseData);
    }

    @GetMapping(ApiPath.CATEGORY_EXERCISES)
    public ResponseEntity<ResponseData> getExercisesByCategoryId(@PathVariable(name = "category-id") UUID categoryId) {
        ResponseData responseData = ResponseData.success(exerciseService.getExercisesByCategoryId(categoryId),
                FeedbackMessage.EXERCISES_BY_CATEGORY_RETRIEVED);
        return ResponseEntity.ok(responseData);
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(ApiPath.EXERCISES + ApiPath.EXERCISE_BY_ID)
    public ResponseEntity<ResponseData> deleteExerciseById(@PathVariable(name = "exercise-id") UUID exerciseId) {
        exerciseService.deleteExerciseById(exerciseId);
        ResponseData responseData = ResponseData.successWithoutMetaAndData(FeedbackMessage.EXERCISE_DELETED);
        return ResponseEntity.ok(responseData);
    }

    @GetMapping(ApiPath.EXERCISES + ApiPath.EXERCISE_BY_ID)
    public ResponseEntity<ResponseData> getExerciseById(@PathVariable(name = "exercise-id") UUID exerciseId) {
        ResponseData responseData = ResponseData.success(exerciseService.getExerciseById(exerciseId),
                FeedbackMessage.EXERCISE_RETRIEVED);
        return ResponseEntity.ok(responseData);
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping(ApiPath.EXERCISES + ApiPath.EXERCISE_BY_ID)
    public ResponseEntity<ResponseData> updateExerciseById(@PathVariable(name = "exercise-id") UUID exerciseId,
                                                           @RequestBody ExerciseUpdatingRequest exerciseUpdatingRequest) {
        ResponseData responseData = ResponseData.success(exerciseService.updateExerciseById(exerciseId, exerciseUpdatingRequest),
                FeedbackMessage.EXERCISE_UPDATED);
        return ResponseEntity.ok(responseData);
    }

    @GetMapping(ApiPath.EXERCISES)
    public ResponseEntity<ResponseData> getAllExercises() {
        ResponseData responseData = ResponseData.success(exerciseService.getAllExercises(),
                FeedbackMessage.EXERCISES_RETRIEVED);
        return ResponseEntity.ok(responseData);
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(ApiPath.EXERCISES + ApiPath.UPLOAD_IMAGE)
    public ResponseEntity<ResponseData> uploadExerciseImage(@RequestParam MultipartFile file) {
        ResponseData responseData = ResponseData.success(storageService.uploadFileWithFolder(file, "exercises"),
                FeedbackMessage.IMAGE_UPLOADED);
        return ResponseEntity.ok(responseData);
    }

    @GetMapping(ApiPath.EXERCISES + ApiPath.EXERCISES_SEARCH)
    public ResponseEntity<ResponseData> searchExercises(@RequestParam String query, @RequestParam String type) {
        ResponseData responseData = ResponseData.success(exerciseService.searchByName(query, type),
                FeedbackMessage.EXERCISE_SEARCHED);
        return ResponseEntity.ok(responseData);
    }
}
