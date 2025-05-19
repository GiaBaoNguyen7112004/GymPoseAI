package com.pbl5.gympose.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pbl5.gympose.payload.message.AIProcessMessage;
import com.pbl5.gympose.producer.AIMessageProducer;
import com.pbl5.gympose.service.WorkoutSessionService;
import com.pbl5.gympose.utils.LogUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class RawWebSocketHandler extends TextWebSocketHandler {
    static final String USER_ID = "user_id";
    static final String WORKOUT_SUMMARY_ID = "workout_summary_id";
    static final String EXERCISE_ID = "exercise_id";
    private final AIMessageProducer producer;
    private final WorkoutSessionService workoutSessionService;
    private final WebSocketSessionService webSocketSessionService;

    private AIProcessMessage convertToAIProcessMessage(TextMessage textMessage) {
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonPayload = textMessage.getPayload();
        try {
            return objectMapper.readValue(jsonPayload, AIProcessMessage.class);
        } catch (Exception e) {
            throw new IllegalArgumentException("ERROR - cannot convert to ai process message", e);
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        try {
            Map<String, UUID> params = extractQueryParams(session);
            UUID userIdParam = params.get(USER_ID);
            UUID exerciseIdParam = params.get(EXERCISE_ID);
            UUID workoutSummaryIdParam = params.get(WORKOUT_SUMMARY_ID);
            UUID workoutSummaryId = workoutSessionService.startWorkoutSession(session, userIdParam, exerciseIdParam,
                    workoutSummaryIdParam);

            webSocketSessionService.sendMessageAfterConnection(session, workoutSummaryId);
            webSocketSessionService.initSession(session, userIdParam, workoutSummaryId, exerciseIdParam);

            LogUtils.info("INFO - New websocket connection : " + session.getId());
        } catch (Exception e) {
            LogUtils.error("ERROR - Start training failed: " + e.getMessage());
            Throwable cause = e.getCause();
            if (cause != null) {
                LogUtils.error("ERROR - Cause: " + cause.getMessage());
                cause.printStackTrace();
            }
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        try {
            AIProcessMessage aiProcessMessage = convertToAIProcessMessage(message);
            producer.sendMessage(aiProcessMessage);
        } catch (Exception e) {
            LogUtils.error("ERROR - Send text message to client failed: " + e.getMessage());
            Throwable cause = e.getCause();
            if (cause != null) {
                LogUtils.error("ERROR - Cause: " + cause.getMessage());
                cause.printStackTrace();
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        try {
            workoutSessionService.endWorkoutSession(session);
            webSocketSessionService.removeSession(session.getId());
            session.close();
            LogUtils.info("INFO - WebSocket connection closed: " + session.getId());
        } catch (Exception e) {
            LogUtils.error("ERROR - After connection closed with error message " + e.getMessage());
            Throwable cause = e.getCause();
            if (cause != null) {
                LogUtils.error("ERROR - Cause: " + cause.getMessage());
                cause.printStackTrace();
            }
        }
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        LogUtils.error("ERROR - WEBSOCKET ERROR " + exception.getMessage());
        webSocketSessionService.removeSession(session.getId());
        session.close(CloseStatus.SERVER_ERROR);
    }

    private Map<String, UUID> extractQueryParams(WebSocketSession session) {
        URI uri = session.getUri();
        if (uri == null) throw new IllegalArgumentException("Session URI is null");

        String query = uri.getQuery();
        if (query == null || query.isBlank()) {
            throw new IllegalArgumentException("No query string found in URI");
        }

        Map<String, UUID> params = new HashMap<>();
        for (String param : query.split("&")) {
            String[] pair = param.split("=", 2);
            if (pair.length == 2 && !pair[0].isBlank()) {
                params.put(pair[0], UUID.fromString(pair[1]));
            }
        }
        return params;
    }
}