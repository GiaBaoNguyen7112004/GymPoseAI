package com.pbl5.gympose.service.impl;

import com.pbl5.gympose.entity.Exercise;
import com.pbl5.gympose.entity.PoseError;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.entity.WorkoutSummary;
import com.pbl5.gympose.exception.NotFoundException;
import com.pbl5.gympose.mapper.PoseErrorMapper;
import com.pbl5.gympose.payload.general.PageInfo;
import com.pbl5.gympose.payload.request.workoutsummary.PoseErrorImageRequest;
import com.pbl5.gympose.payload.response.workoutsummary.PagingWorkoutSummariesResponse;
import com.pbl5.gympose.payload.response.workoutsummary.PoseErrorResponse;
import com.pbl5.gympose.payload.response.workoutsummary.WorkoutStatisticResponse;
import com.pbl5.gympose.payload.response.workoutsummary.WorkoutSummaryDetailResponse;
import com.pbl5.gympose.repository.WorkoutSummaryRepository;
import com.pbl5.gympose.service.UserService;
import com.pbl5.gympose.service.WorkoutSummaryService;
import com.pbl5.gympose.utils.CommonFunction;
import com.pbl5.gympose.utils.LogUtils;
import com.pbl5.gympose.utils.WorkoutUtils;
import com.pbl5.gympose.utils.exception.ErrorMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Clock;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WorkoutSummaryServiceImpl implements WorkoutSummaryService {
    WorkoutSummaryRepository workoutSummaryRepository;
    PoseErrorMapper poseErrorMapper;
    UserService userService;

    public WorkoutSummaryDetailResponse createWorkoutSummaryDetailResponse(WorkoutSummary workoutSummary) {
        Double userWeight = workoutSummary.getUser().getWeight();
        Exercise exercise = workoutSummary.getExercise();
        List<PoseErrorResponse> poseErrors = poseErrorMapper.toPoseErrorResponses(workoutSummary.getPoseErrors());
        poseErrors.sort(Comparator.comparing(PoseErrorResponse::getCreatedAt).reversed());

        return WorkoutSummaryDetailResponse.builder()
                .id(workoutSummary.getId())
                .caloriesBurned(WorkoutUtils.getCaloriesBurned(workoutSummary, userWeight,
                        exercise))
                .caloriesBase(WorkoutUtils.getCaloriesBase(userWeight, exercise))
                .startTime(workoutSummary.getStartTime())
                .durationMinutes(exercise.getDurationMinutes())
                .elapsedTime(workoutSummary.getElapsedTime())
                .category(workoutSummary.getExercise().getCategory().getName())
                .repCount(workoutSummary.getPoseErrors().size() + 3)
                .errorsCount(workoutSummary.getPoseErrors().size())
                .poseErrors(poseErrors)
                .met(exercise.getMet())
                .name(exercise.getName())
                .thumbnailUrl(exercise.getThumbnailUrl())
                .exerciseId(exercise.getId())
                .build();
    }

    @Override
    public PagingWorkoutSummariesResponse getWorkoutHistory(Pageable pageable, UUID userId, String viewMode,
                                                            UUID categoryId) {
//        LocalDateTime fromDate = CommonFunction.getFromDate(viewMode);
//        LocalDateTime toDate = LocalDateTime.now();
        ZoneId vnZone = ZoneId.of("Asia/Ho_Chi_Minh");
        LocalDateTime fromDate = CommonFunction.getFromDate(viewMode);
        LocalDateTime toDate = LocalDateTime.now(Clock.system(vnZone));
        Page<WorkoutSummary> pages = workoutSummaryRepository.getWorkoutSummariesByUser_IdAndCreatedAtBetween(userId,
                fromDate, toDate, pageable);
        PageInfo pageInfo =
                new PageInfo(pageable.getPageNumber() + 1, pages.getTotalPages(), pages.getTotalElements());
        LogUtils.info("INFO - SO WORKOUT:" + pages.getContent().size());

        return PagingWorkoutSummariesResponse.builder()
                .pageInfo(pageInfo)
                .workoutSummaries(Objects.isNull(categoryId) ? pages.getContent().stream()
                        .map(this::createWorkoutSummaryDetailResponse).toList()
                        : pages.getContent().stream().filter(workoutSummary
                                -> workoutSummary.getExercise().getCategory().getId().equals(categoryId))
                        .map(this::createWorkoutSummaryDetailResponse).toList())
                .build();
    }

    @Override
    public WorkoutSummary findById(UUID id) {
        return workoutSummaryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.WORKOUT_SUMMARY_NOT_FOUND));
    }

    @Override
    public List<PoseErrorResponse> getPoseErrors(UUID workoutSummaryId) {
        return poseErrorMapper.toPoseErrorResponses(findById(workoutSummaryId).getPoseErrors());
    }

    @Override
    public List<WorkoutStatisticResponse> getWorkoutStatistics(UUID userId, String viewMode) {
        User user = userService.findById(userId);

        LocalDateTime now = LocalDateTime.now();
        List<WorkoutStatisticResponse> responses = new ArrayList<>();

        switch (viewMode.toLowerCase()) {
            case "weekly":
                for (int i = 0; i < 7; i++) {
                    WorkoutStatisticResponse response = new WorkoutStatisticResponse();

                    LocalDateTime startOfDay = now.minusDays(i).toLocalDate().atStartOfDay();
                    LocalDateTime endOfDay = startOfDay.plusDays(1).minusNanos(1);
                    List<WorkoutSummary> summaries = workoutSummaryRepository.findByUser_IdAndStartTimeBetween(
                            userId, startOfDay, endOfDay);

                    double caloriesBase = summaries.stream().mapToDouble(workoutSummary
                            -> WorkoutUtils.getCaloriesBase(user.getWeight(), workoutSummary.getExercise())).sum();

                    double caloriesBurned = summaries.stream().mapToDouble(workoutSummary
                            -> WorkoutUtils.getCaloriesBurned(workoutSummary, user.getWeight(), workoutSummary.getExercise())).sum();

                    Set<String> categories = new HashSet<>();
                    summaries.forEach(workoutSummary -> categories.add(workoutSummary.getExercise()
                            .getCategory().getName()));

                    response.setDate(startOfDay.toLocalDate());
                    response.setCaloriesBase(caloriesBase);
                    response.setCaloriesBurned(caloriesBurned);
                    response.setCategories(categories);

                    responses.add(response);
                }
                break;

            case "monthly":
                int currentMonth = now.getMonthValue();
                int daysInMonth = now.toLocalDate().lengthOfMonth();

                for (int i = 0; i < daysInMonth; i++) {
                    WorkoutStatisticResponse response = new WorkoutStatisticResponse();

                    LocalDateTime startOfDay = now.withMonth(currentMonth).withDayOfMonth(i + 1).toLocalDate().atStartOfDay();

                    if (startOfDay.getMonthValue() != currentMonth) break;

                    LocalDateTime endOfDay = startOfDay.plusDays(1).minusNanos(1);

                    List<WorkoutSummary> summaries = workoutSummaryRepository.findByUser_IdAndStartTimeBetween(
                            userId, startOfDay, endOfDay);

                    double caloriesBase = summaries.stream().mapToDouble(workoutSummary
                            -> WorkoutUtils.getCaloriesBase(user.getWeight(), workoutSummary.getExercise())).sum();

                    double caloriesBurned = summaries.stream().mapToDouble(workoutSummary
                            -> WorkoutUtils.getCaloriesBurned(workoutSummary, user.getWeight(),
                            workoutSummary.getExercise())).sum();

                    Set<String> categories = new HashSet<>();
                    summaries.forEach(workoutSummary -> categories.add(workoutSummary.getExercise()
                            .getCategory().getName()));

                    response.setDate(startOfDay.toLocalDate());
                    response.setCaloriesBase(caloriesBase);
                    response.setCaloriesBurned(caloriesBurned);
                    response.setCategories(categories);

                    responses.add(response);
                }
                break;
            case "yearly":
                // Tổng hợp dữ liệu theo năm
                int currentYear = now.getYear();
                for (int i = 0; i < 12; i++) {  // Giới hạn 12 tháng trong năm
                    WorkoutStatisticResponse response = new WorkoutStatisticResponse();

                    LocalDateTime startOfMonth = now.withYear(currentYear).withMonth(i + 1).withDayOfMonth(1)
                            .toLocalDate().atStartOfDay();
                    LocalDateTime endOfMonth = startOfMonth.plusMonths(1).minusNanos(1);
                    List<WorkoutSummary> summaries = workoutSummaryRepository.findByUser_IdAndStartTimeBetween(
                            userId, startOfMonth, endOfMonth);
                    double caloriesBase = summaries.stream().mapToDouble(workoutSummary
                            -> WorkoutUtils.getCaloriesBase(user.getWeight(), workoutSummary.getExercise())).sum();

                    double caloriesBurned = summaries.stream().mapToDouble(workoutSummary
                            -> WorkoutUtils.getCaloriesBurned(workoutSummary, user.getWeight(), workoutSummary.getExercise())).sum();

                    Set<String> categories = new HashSet<>();
                    summaries.forEach(workoutSummary -> categories.add(workoutSummary.getExercise()
                            .getCategory().getName()));

                    response.setDate(startOfMonth.toLocalDate());
                    response.setCaloriesBase(caloriesBase);
                    response.setCaloriesBurned(caloriesBurned);
                    response.setCategories(categories);

                    responses.add(response);
                }
                break;
            default:
                throw new IllegalArgumentException("Invalid viewMode: " + viewMode);
        }

        return responses;
    }

    @Override
    public WorkoutSummary findByIdAndUserId(UUID workoutSummaryId, UUID userId) {
        return workoutSummaryRepository.findByIdAndUser_Id(workoutSummaryId, userId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.WORKOUT_SUMMARY_NOT_FOUND));
    }

    @Override
    public WorkoutSummaryDetailResponse getWorkoutSummaryDetail(UUID workoutSummaryId) {
        return createWorkoutSummaryDetailResponse(findById(workoutSummaryId));
    }

    @Override
    public WorkoutSummary save(WorkoutSummary workoutSummary) {
        return workoutSummaryRepository.save(workoutSummary);
    }

    @Override
    public void delete(UUID workoutSummaryId) {
        workoutSummaryRepository.deleteById(workoutSummaryId);
    }

    @Override
    public void addImageUrlsToPoseErrors(UUID workoutSummaryId, List<PoseErrorImageRequest> poseErrorsImages) {
        poseErrorsImages.forEach(poseErrorImageRequest -> {
            LogUtils.info("REQUEST - " + poseErrorImageRequest.getUrl());
            LogUtils.info("REQUEST - " + poseErrorImageRequest.getRepIndex());
        });

        WorkoutSummary workoutSummary = findById(workoutSummaryId);

        LogUtils.info("INFO - ADD IMAGES TO URL");
        List<PoseError> poseErrors = workoutSummary.getPoseErrors();
        LogUtils.info("INFO - ADD IMAGES : SIZE POSE ERRROS" + poseErrors.size());
//        poseErrors.forEach(poseError -> {
//            String repIndex = String.valueOf(poseError.getRepIndex());
//            poseErrorsImages.stream()
//                    .filter(imageReq -> repIndex.equals(imageReq.getRepIndex()))
//                    .findFirst()
//                    .ifPresent(imageReq -> poseError.setImageUrl(imageReq.getUrl()));
//        });
        poseErrors.forEach(poseError -> {
            if (poseError.getImageUrl() == null || poseError.getImageUrl().isBlank()) {
                String repIndex = String.valueOf(poseError.getRepIndex());
                poseErrorsImages.stream()
                        .filter(imageReq -> repIndex.equals(imageReq.getRepIndex()))
                        .findFirst()
                        .ifPresent(imageReq -> poseError.setImageUrl(imageReq.getUrl()));
            }
        });
//        if (workoutSummary.getPoseErrors() == null) {
//            workoutSummary.setPoseErrors(new ArrayList<>());
//        }
//        workoutSummary.getPoseErrors().addAll(poseErrors);
        save(workoutSummary);
    }
}
