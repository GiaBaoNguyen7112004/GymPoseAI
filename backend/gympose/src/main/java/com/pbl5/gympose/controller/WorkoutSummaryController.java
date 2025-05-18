package com.pbl5.gympose.controller;

import com.pbl5.gympose.entity.UserPrincipal;
import com.pbl5.gympose.payload.general.ResponseData;
import com.pbl5.gympose.payload.response.workoutsummary.PagingWorkoutSummariesResponse;
import com.pbl5.gympose.security.annotation.CurrentUser;
import com.pbl5.gympose.service.WorkoutSummaryService;
import com.pbl5.gympose.utils.ApiPath;
import com.pbl5.gympose.utils.FeedbackMessage;
import com.pbl5.gympose.utils.PagingUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(ApiPath.WORKOUT_SUMMARY)
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "WorkoutSumamry API", description = "Workout summary management")
public class WorkoutSummaryController {
    WorkoutSummaryService workoutSummaryService;

    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "get workout summary by id")
    @GetMapping(ApiPath.WORKOUT_SUMMARY_BY_ID)
    public ResponseEntity<ResponseData> getWorkoutSummaryById(@PathVariable(name = "workout-summary-id") UUID id) {
        ResponseData responseData = ResponseData.success(workoutSummaryService.getWorkoutSummaryDetail(id),
                FeedbackMessage.WORKOUT_SUMMARY_RETRIEVED);
        return ResponseEntity.ok(responseData);
    }

    @SecurityRequirement(name = "bearerAuth")
    @GetMapping(ApiPath.WORKOUT_SUMMARY_HISTORY)
    @Operation(summary = "get workout histories")
    public ResponseEntity<ResponseData> getWorkoutHistory(@RequestParam(name = "sort_by", defaultValue = "created_at") String sortBy,
                                                          @RequestParam(name = "order", defaultValue = "desc") String order,
                                                          @RequestParam(name = "page", defaultValue = "1") int page,
                                                          @RequestParam(name = "limit", defaultValue = "10") int paging,
                                                          @RequestParam(name = "viewMode", defaultValue = "daily") String viewMode,
                                                          @RequestParam(name = "category", required = false) UUID category,
                                                          @CurrentUser UserPrincipal userPrincipal) {
        Pageable pageable = PagingUtils.makePageRequest(sortBy, order, page, paging);
        PagingWorkoutSummariesResponse response = workoutSummaryService
                .getWorkoutHistory(pageable, userPrincipal.getId(), viewMode, category);
        ResponseData responseData = ResponseData.successWithMeta(response.getWorkoutSummaries(), response.getPageInfo(),
                FeedbackMessage.WORKOUT_SUMMARIES_RETRIEVED);
        return ResponseEntity.ok(responseData);
    }

    @SecurityRequirement(name = "bearerAuth")
    @GetMapping(ApiPath.WORKOUT_SUMMARY_BY_ID + ApiPath.WORKOUT_SUMMARY_ERROR)
    @Operation(summary = "get workout pose errors")
    public ResponseEntity<ResponseData> getWorkoutPoseErrors(@PathVariable(name = "workout-summary-id") UUID id) {
        ResponseData responseData = ResponseData.success(workoutSummaryService.getPoseErrors(id),
                FeedbackMessage.POSE_ERRORS_RETRIEVED);
        return ResponseEntity.ok(responseData);
    }

    @SecurityRequirement(name = "bearerAuth")
    @GetMapping(ApiPath.WORKOUT_STATISTICS)
    @Operation(summary = "get workout statistics")
    public ResponseEntity<ResponseData> getWorkoutStatistics(@CurrentUser UserPrincipal userPrincipal,
                                                             @RequestParam(name = "viewMode", defaultValue = "weekly") String viewMode) {
        ResponseData responseData = ResponseData
                .success(workoutSummaryService.getWorkoutStatistics(userPrincipal.getId(), viewMode),
                        FeedbackMessage.WORKOUT_STATISTICS_RETRIEVED);
        return ResponseEntity.ok(responseData);
    }

}
