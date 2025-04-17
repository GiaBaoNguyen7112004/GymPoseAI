package com.pbl5.gympose.controller;

import com.pbl5.gympose.payload.general.ResponseData;
import com.pbl5.gympose.payload.request.ExerciseCreationRequest;
import com.pbl5.gympose.payload.request.ExerciseUpdatingRequest;
import com.pbl5.gympose.service.ExerciseService;
import com.pbl5.gympose.service.storage.StorageService;
import com.pbl5.gympose.utils.ApiPath;
import com.pbl5.gympose.utils.FeedbackMessage;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ExerciseController {
    ExerciseService exerciseService;
    StorageService storageService;

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

    @PostMapping(ApiPath.EXERCISES + ApiPath.EXERCISE_UPLOAD_IMAGE)
    public ResponseEntity<ResponseData> uploadExerciseImage(@RequestParam MultipartFile file) {
        ResponseData responseData = ResponseData.success(storageService.uploadFileWithFolder(file, "exercises"),
                FeedbackMessage.IMAGE_UPLOADED);
        return ResponseEntity.ok(responseData);
    }
}
