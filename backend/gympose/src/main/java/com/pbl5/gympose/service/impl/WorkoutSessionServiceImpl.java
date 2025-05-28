package com.pbl5.gympose.service.impl;

import com.pbl5.gympose.entity.Exercise;
import com.pbl5.gympose.entity.PoseError;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.entity.WorkoutSummary;
import com.pbl5.gympose.event.WorkoutFinishEvent;
import com.pbl5.gympose.service.ExerciseService;
import com.pbl5.gympose.service.UserService;
import com.pbl5.gympose.service.WorkoutSessionService;
import com.pbl5.gympose.service.WorkoutSummaryService;
import com.pbl5.gympose.utils.LogUtils;
import com.pbl5.gympose.websocket.WebSocketSessionUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WorkoutSessionServiceImpl implements WorkoutSessionService {
    ExerciseService exerciseService;
    UserService userService;
    WorkoutSummaryService workoutSummaryService;
    ApplicationEventPublisher eventPublisher;


    @Override
    public UUID startWorkoutSession(WebSocketSession session, UUID userId, UUID exerciseId, UUID workoutSummaryId) {
        try {
            if (workoutSummaryId != null) {
                WebSocketSessionUtils.setIsContinueAttribute(session, true);
            } else {
                Exercise exercise = exerciseService.findById(exerciseId);
                User user = userService.findById(userId);

                WorkoutSummary workoutSummary = new WorkoutSummary();
                workoutSummary.setDurationMinutes(exercise.getDurationMinutes());
                workoutSummary.setUser(user);
                workoutSummary.setExercise(exercise);
                workoutSummary.setStartTime(LocalDateTime.now());

                WorkoutSummary savedWorkoutSummary = workoutSummaryService.save(workoutSummary);
                workoutSummaryId = savedWorkoutSummary.getId();
            }
            return workoutSummaryId;
        } catch (Exception e) {
            throw new IllegalArgumentException("ERROR - Failed to start workout session", e);
        }
    }

    @Override
    public void endWorkoutSession(WebSocketSession session) {
        LogUtils.info("INFO - VAO END WORKOUT SESSION");
        UUID workoutSummaryId = WebSocketSessionUtils.getWorkoutSummaryIdAttribute(session);
        WorkoutSummary workoutSummary = workoutSummaryService.findById(workoutSummaryId);

        int sessionDurationMinutes = (int) Duration.between(workoutSummary.getStartTime(), LocalDateTime.now())
                .toSeconds();

        workoutSummary.setElapsedTime(isContinueWorkout(session)
                ? (workoutSummary.getElapsedTime() + sessionDurationMinutes)
                : sessionDurationMinutes);
        workoutSummary.getPoseErrors().clear();
        List<PoseError> poseErrors = WebSocketSessionUtils.getPoseErrorsAttribute(session);
        workoutSummary.setPoseErrors(poseErrors);
        WorkoutSummary savedWorkoutSummary = workoutSummaryService.save(workoutSummary);
        eventPublisher.publishEvent(new WorkoutFinishEvent(savedWorkoutSummary));
    }

    public boolean isContinueWorkout(WebSocketSession session) {
        return WebSocketSessionUtils.getIsContinueAttribute(session);
    }

}
