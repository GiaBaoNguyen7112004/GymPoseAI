package com.pbl5.gympose.service.impl;

import com.pbl5.gympose.entity.Exercise;
import com.pbl5.gympose.entity.PoseError;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.entity.WorkoutSummary;
import com.pbl5.gympose.exception.NotFoundException;
import com.pbl5.gympose.mapper.PoseErrorMapper;
import com.pbl5.gympose.payload.general.PageInfo;
import com.pbl5.gympose.payload.request.workoutsummary.WorkoutSummaryCreationRequest;
import com.pbl5.gympose.payload.response.workoutsummary.PagingWorkoutSummariesResponse;
import com.pbl5.gympose.payload.response.workoutsummary.PoseErrorResponse;
import com.pbl5.gympose.payload.response.workoutsummary.WorkoutStatisticResponse;
import com.pbl5.gympose.payload.response.workoutsummary.WorkoutSummaryDetailResponse;
import com.pbl5.gympose.repository.WorkoutSummaryRepository;
import com.pbl5.gympose.service.ExerciseService;
import com.pbl5.gympose.service.UserService;
import com.pbl5.gympose.service.WorkoutSummaryService;
import com.pbl5.gympose.utils.CommonFunction;
import com.pbl5.gympose.utils.WorkoutUtils;
import com.pbl5.gympose.utils.exception.ErrorMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WorkoutSummaryServiceImpl implements WorkoutSummaryService {
    WorkoutSummaryRepository workoutSummaryRepository;
    PoseErrorMapper poseErrorMapper;
    UserService userService;
    ExerciseService exerciseService;

    public WorkoutSummaryDetailResponse createWorkoutSummaryDetailResponse(WorkoutSummary workoutSummary) {
        Double userWeight = workoutSummary.getUser().getWeight();
        Exercise exercise = workoutSummary.getExercise();
        return WorkoutSummaryDetailResponse.builder()
                .id(workoutSummary.getId())
                .caloriesBurned(WorkoutUtils.getCaloriesBurned(workoutSummary, userWeight,
                        exercise))
                .CaloriesBase(WorkoutUtils.getCaloriesBase(userWeight, exercise))
                .startTime(workoutSummary.getStartTime())
                .endTime(workoutSummary.getEndTime())
                .category(workoutSummary.getExercise().getCategory().getName())
                .errorsCount(workoutSummary.getPoseErrors().size())
                .build();
    }

    @Override
    public WorkoutSummaryDetailResponse createWorkoutSummary(WorkoutSummaryCreationRequest request,
                                                             UUID userId, UUID exerciseId) {
        User user = userService.findById(userId);
        Exercise exercise = exerciseService.findById(exerciseId);

        WorkoutSummary workoutSummary = new WorkoutSummary();
        workoutSummary.setStartTime(request.getStartTime());
        workoutSummary.setEndTime(request.getEndTime());
        workoutSummary.setUser(user);
        workoutSummary.setExercise(exercise);

        List<PoseError> poseErrors = request.getPoseErrors().stream()
                .map(poseErrorMapper::toPoseError)
                .toList();

        workoutSummary.setPoseErrors(poseErrors);


        return createWorkoutSummaryDetailResponse(workoutSummaryRepository.save(workoutSummary));
    }

    @Override
    public PagingWorkoutSummariesResponse getWorkoutHistory(Pageable pageable, UUID userId, String viewMode,
                                                            UUID categoryId) {
        LocalDateTime fromDate = CommonFunction.getFromDate(viewMode);
        LocalDateTime toDate = LocalDateTime.now();
        Page<WorkoutSummary> pages = workoutSummaryRepository.getWorkoutSummariesByUser_IdAndCreatedAtBetween(userId,
                fromDate, toDate, pageable);
        PageInfo pageInfo =
                new PageInfo(pageable.getPageNumber() + 1, pages.getTotalPages(), pages.getTotalElements());

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
    public WorkoutSummary save(WorkoutSummary workoutSummary) {
        return workoutSummaryRepository.save(workoutSummary);
    }
}
