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
import com.pbl5.gympose.utils.CommonFunction;
import com.pbl5.gympose.websocket.WebSocketSessionInfo;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.net.URI;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WorkoutSessionServiceImpl implements WorkoutSessionService {
    static final String USER_ID = "userId";
    static final String EXERCISE_ID = "exerciseId";
    static final String WORKOUT_SUMMARY_ID = "workoutSummaryId";
    static final String IS_CONTINUE = "isContinue";
    static final String SESSION_START_TIME = "sessionStartTime";

    ExerciseService exerciseService;
    UserService userService;
    WorkoutSummaryService workoutSummaryService;

    ApplicationEventPublisher eventPublisher;

    private Map<String, String> extractQueryParams(WebSocketSession session) {
        URI uri = session.getUri();
        if (uri == null) throw new IllegalArgumentException("Session URI is null");

        String query = uri.getQuery();
        if (query == null || query.isBlank()) {
            throw new IllegalArgumentException("No query string found in URI");
        }

        Map<String, String> params = new HashMap<>();
        for (String param : query.split("&")) {
            String[] pair = param.split("=", 2);
            if (pair.length == 2 && !pair[0].isBlank()) {
                params.put(pair[0], pair[1]);
            }
        }

        return params;
    }

    @Override
    public String startWorkoutSession(WebSocketSession session) {
        try {
            Map<String, String> params = extractQueryParams(session);
            String userId = params.get(USER_ID);
            String exerciseId = params.get(EXERCISE_ID);
            String workoutSummaryId = params.get(WORKOUT_SUMMARY_ID);
            LocalDateTime now = LocalDateTime.now();

            if (workoutSummaryId != null) {
                putSessionAttribute(session, IS_CONTINUE, true);
            } else {
                Exercise exercise = exerciseService.findById(CommonFunction.convertStringToUUID(exerciseId));
                User user = userService.findById(CommonFunction.convertStringToUUID(userId));

                WorkoutSummary workoutSummary = new WorkoutSummary();
                workoutSummary.setDurationMinutes(exercise.getDurationMinutes());
                workoutSummary.setUser(user);
                workoutSummary.setExercise(exercise);
                workoutSummary.setStartTime(now);

                WorkoutSummary savedWorkoutSummary = workoutSummaryService.save(workoutSummary);
                workoutSummaryId = savedWorkoutSummary.getId().toString();
            }
            putSessionAttribute(session, WORKOUT_SUMMARY_ID, workoutSummaryId);
            putSessionAttribute(session, SESSION_START_TIME, now);

            return workoutSummaryId;
        } catch (Exception e) {
            throw new IllegalArgumentException("ERROR - Failed to start workout session", e);
        }
    }

    @Override
    public void endWorkoutSession(WebSocketSessionInfo webSocketSessionInfo) {
        WebSocketSession session = webSocketSessionInfo.getSession();
        List<PoseError> poseErrors = webSocketSessionInfo.getPoseErrors();
        WorkoutSummary workoutSummary = workoutSummaryService
                .findById(CommonFunction
                        .convertStringToUUID(getSessionAttribute(session, WORKOUT_SUMMARY_ID).toString()));

        int sessionDurationMinutes = (int) Duration.between(workoutSummary.getStartTime(), LocalDateTime.now())
                .toSeconds();

        workoutSummary.setElapsedTime(isContinueWorkout(session)
                ? (workoutSummary.getElapsedTime() + sessionDurationMinutes)
                : sessionDurationMinutes);
        workoutSummary.getPoseErrors().addAll(poseErrors);
        WorkoutSummary savedWorkoutSummary = workoutSummaryService.save(workoutSummary);

        eventPublisher.publishEvent(new WorkoutFinishEvent(savedWorkoutSummary));
    }

    private Object getSessionAttribute(WebSocketSession session, String key) {
        return session.getAttributes().get(key);
    }

    private void putSessionAttribute(WebSocketSession session, String key, Object value) {
        session.getAttributes().put(key, value);
    }

    private boolean isContinueWorkout(WebSocketSession session) {
        return getSessionAttribute(session, IS_CONTINUE) != null;
    }
}
