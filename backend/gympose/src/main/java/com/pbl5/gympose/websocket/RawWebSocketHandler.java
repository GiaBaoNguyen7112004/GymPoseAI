package com.pbl5.gympose.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pbl5.gympose.entity.Exercise;
import com.pbl5.gympose.entity.PoseError;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.entity.WorkoutSummary;
import com.pbl5.gympose.event.WorkoutFinishEvent;
import com.pbl5.gympose.payload.message.AIProcessMessage;
import com.pbl5.gympose.producer.AIMessageProducer;
import com.pbl5.gympose.service.ExerciseService;
import com.pbl5.gympose.service.UserService;
import com.pbl5.gympose.service.WorkoutSummaryService;
import com.pbl5.gympose.utils.LogUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.net.URI;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
public class RawWebSocketHandler extends TextWebSocketHandler {
    static final String UNKNOW_PARAM = "unknown";

    static final String SESSION_ATTRIBUTE_START_TIME = "startTime";
    static final String SESSION_ATTRIBUTE_USER_ID = "userId";
    static final String SESSION_ATTRIBUTE_EXERCISE_ID = "exerciseId";
    static final String SESSION_ATTRIBUTE_WORKOUT_SUMMARY_ID = "workoutSummaryId";
    static final String SESSION_ATTRIBUTE_IS_CONTINUE = "isContinue";

    private final AIMessageProducer producer;

    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final Map<String, List<PoseError>> sessionPoseErrors = new ConcurrentHashMap<>();

    private final UserService userService;
    private final ExerciseService exerciseService;
    private final WorkoutSummaryService workoutSummaryService;

    private final ApplicationEventPublisher eventPublisher;

    public static AIProcessMessage convertToAIProcessMessage(TextMessage textMessage) {
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonPayload = textMessage.getPayload();

        AIProcessMessage aiProcessMessage = null;
        try {
            aiProcessMessage = objectMapper.readValue(jsonPayload, AIProcessMessage.class);
        } catch (Exception e) {
            LogUtils.error("cannot convert to ai process message: " + e.getMessage());
        }

        return aiProcessMessage;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String[] params = getParamsFromSession(session);
        String userId = params[0];
        String exerciseId = params[1];
        String workoutSummaryId = params[2];

        if (!workoutSummaryId.equals(UNKNOW_PARAM)) {
            session.getAttributes().put(SESSION_ATTRIBUTE_IS_CONTINUE, true);
        } else {
            workoutSummaryId = UUID.randomUUID().toString();
        }


        session.getAttributes().put(SESSION_ATTRIBUTE_START_TIME, LocalDateTime.now());
        session.getAttributes().put(SESSION_ATTRIBUTE_USER_ID, userId);
        session.getAttributes().put(SESSION_ATTRIBUTE_EXERCISE_ID, exerciseId);
        session.getAttributes().put(SESSION_ATTRIBUTE_WORKOUT_SUMMARY_ID, workoutSummaryId);

        session.sendMessage(new TextMessage(workoutSummaryId));

        sessions.put(userId, session);
        LogUtils.info("New WebSocket connection: userId=" + userId);
    }

    // Trả về String[]: [userId, exerciseId, workoutSummaryId]
    private String[] getParamsFromSession(WebSocketSession session) {
        String userIdParam = "userId";
        String exerciseIdParam = "exerciseId";
        String workoutSummaryIdParam = "workoutSummaryId";

        URI uri = session.getUri(); // vd: ws://host/ws?userId=abc123&exerciseId=ex567&workoutSummaryId=ws789
        if (uri == null) return new String[]{UNKNOW_PARAM, UNKNOW_PARAM, UNKNOW_PARAM};

        String query = uri.getQuery();
        if (query == null) {
            LogUtils.error("Query is null");
            return new String[]{UNKNOW_PARAM, UNKNOW_PARAM, UNKNOW_PARAM};
        }

        Map<String, String> params = new HashMap<>();
        for (String param : query.split("&")) {
            String[] pair = param.split("=");
            if (pair.length == 2) {
                params.put(pair[0], pair[1]);
            }
        }

        String userId = params.getOrDefault(userIdParam, UNKNOW_PARAM);
        String exerciseId = params.getOrDefault(exerciseIdParam, UNKNOW_PARAM);
        String workoutSummaryId = params.getOrDefault(workoutSummaryIdParam, UNKNOW_PARAM);

        return new String[]{userId, exerciseId, workoutSummaryId};
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        AIProcessMessage aiProcessMessage = convertToAIProcessMessage(message);
        producer.sendMessage(aiProcessMessage);
    }

    public void sendToUser(String userId, String message) {
        if (userId == null) {
            LogUtils.error("userId is null");
            return;
        }
        WebSocketSession session = sessions.get(userId);
        if (session != null && session.isOpen()) {
            try {
                synchronized (session) {
                    session.sendMessage(new TextMessage(message));
                }
            } catch (IOException e) {
                LogUtils.error("Failed to send WebSocket message to " + userId);
            }
        } else {
            LogUtils.warn("WebSocket session not found or closed for user " + userId);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        saveWorkoutSummary(session);
        String userId = session.getAttributes().get(SESSION_ATTRIBUTE_USER_ID).toString();
        sessionPoseErrors.remove(userId);
        sessions.entrySet().removeIf(entry -> entry.getValue().getId()
                .equals(session.getId()));
        LogUtils.info("WebSocket connection closed: " + session.getId());
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        LogUtils.info("WebSocket error: " + exception.getMessage());
        sessions.entrySet().removeIf(entry -> entry.getValue().getId()
                .equals(session.getId()));
        session.close(CloseStatus.SERVER_ERROR);
    }

    public void addSessionPoseError(String userId, PoseError poseError) {
        sessionPoseErrors
                .computeIfAbsent(userId, k -> new ArrayList<>())
                .add(poseError);
    }

    public void saveWorkoutSummary(WebSocketSession session) {
        Exercise exercise = exerciseService.findById(UUID.fromString(session.getAttributes()
                .get(SESSION_ATTRIBUTE_EXERCISE_ID).toString()));
        User user = userService.findById(UUID.fromString(session.getAttributes()
                .get(SESSION_ATTRIBUTE_USER_ID).toString()));
        LocalDateTime startTime = (LocalDateTime) session.getAttributes().get(SESSION_ATTRIBUTE_START_TIME);
        List<PoseError> errors = sessionPoseErrors.get(user.getId().toString());
        UUID workoutSummaryId = UUID.fromString(session.getAttributes().get(SESSION_ATTRIBUTE_WORKOUT_SUMMARY_ID)
                .toString());
        int sessionDurationMinutes = (int) Duration.between(startTime, LocalDateTime.now()).toSeconds();

        WorkoutSummary workoutSummary = null;
        if (session.getAttributes().containsKey(SESSION_ATTRIBUTE_IS_CONTINUE)) {
            workoutSummary = workoutSummaryService.findById(workoutSummaryId);
            workoutSummary.setElapsedTime(workoutSummary.getElapsedTime() + sessionDurationMinutes);
            workoutSummary.getPoseErrors().addAll(errors);
        } else {
            workoutSummary = new WorkoutSummary();
            workoutSummary.setStartTime(startTime);
            workoutSummary.setElapsedTime(sessionDurationMinutes);
            workoutSummary.setExercise(exercise);
            workoutSummary.setUser(user);
            workoutSummary.getPoseErrors().addAll(errors);
        }
        WorkoutSummary savedWorkoutSummary = workoutSummaryService.save(workoutSummary);
        eventPublisher.publishEvent(new WorkoutFinishEvent(savedWorkoutSummary));
    }
}