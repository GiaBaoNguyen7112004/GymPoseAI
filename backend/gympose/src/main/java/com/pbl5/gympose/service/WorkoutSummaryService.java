package com.pbl5.gympose.service;

import com.pbl5.gympose.entity.WorkoutSummary;
import com.pbl5.gympose.payload.request.workoutsummary.PoseErrorImageRequest;
import com.pbl5.gympose.payload.response.workoutsummary.PagingWorkoutSummariesResponse;
import com.pbl5.gympose.payload.response.workoutsummary.PoseErrorResponse;
import com.pbl5.gympose.payload.response.workoutsummary.WorkoutStatisticResponse;
import com.pbl5.gympose.payload.response.workoutsummary.WorkoutSummaryDetailResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface WorkoutSummaryService {
    PagingWorkoutSummariesResponse getWorkoutHistory(Pageable pageable, UUID userId, String viewMode,
                                                     UUID categoryId);

    WorkoutSummary findById(UUID id);

    List<PoseErrorResponse> getPoseErrors(UUID workoutSummaryId);

    List<WorkoutStatisticResponse> getWorkoutStatistics(UUID userId, String viewMode);

    WorkoutSummary findByIdAndUserId(UUID workoutSummaryId, UUID userId);

    WorkoutSummaryDetailResponse getWorkoutSummaryDetail(UUID workoutSummaryId);

    WorkoutSummary save(WorkoutSummary workoutSummary);

    void delete(UUID workoutSummaryId);

    void addImageUrlsToPoseErrors(UUID workoutSummaryId, List<PoseErrorImageRequest> poseErrorsImages);
}
