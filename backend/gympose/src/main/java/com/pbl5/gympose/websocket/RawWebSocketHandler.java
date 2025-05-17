package com.pbl5.gympose.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pbl5.gympose.entity.PoseError;
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

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
public class RawWebSocketHandler extends TextWebSocketHandler {
    private final AIMessageProducer producer;
    private final Map<String, WebSocketSessionInfo> sessions = new ConcurrentHashMap<>();
    private final WorkoutSessionService workoutSessionService;

    public static AIProcessMessage convertToAIProcessMessage(TextMessage textMessage) {
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonPayload = textMessage.getPayload();
        try {
            return objectMapper.readValue(jsonPayload, AIProcessMessage.class);
        } catch (Exception e) {
            throw new IllegalArgumentException("cannot convert to ai process message", e);
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        try {
            session.sendMessage(new TextMessage(workoutSessionService.startWorkoutSession(session)));
            sessions.put(session.getId(), new WebSocketSessionInfo(session, new ArrayList<>()));
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

    public void sendResultToClient(String sessionId, String message) {
        if (sessionId == null) {
            LogUtils.error("ERROR - Failed to send AI Result to client because sessionId is null");
            return;
        }
        WebSocketSessionInfo sessionInfo = sessions.get(sessionId);
        if (sessionInfo != null && sessionInfo.getSession().isOpen()) {
            WebSocketSession session = sessionInfo.getSession();
            try {
                synchronized (session) {
                    session.sendMessage(new TextMessage(message));
                }
            } catch (IOException e) {
                LogUtils.error("Failed to send WebSocket message to " + sessionId);
            }
        } else {
            LogUtils.warn("WebSocket session with id " + sessionId + " not found");
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        workoutSessionService.endWorkoutSession(sessions.get(session.getId()));
        sessions.remove(session.getId());
        LogUtils.info("INFO - WebSocket connection closed: " + session.getId());
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        LogUtils.error("ERROR - WEBSOCKET ERROR " + exception.getMessage());
        sessions.remove(session.getId());
        session.close(CloseStatus.SERVER_ERROR);
    }

    public void addSessionPoseError(String sessionId, PoseError poseError) {
        WebSocketSessionInfo sessionInfo = sessions.get(sessionId);
        if (sessionInfo != null) {
            synchronized (sessionInfo) {
                sessionInfo.getPoseErrors().add(poseError);
            }
        } else {
            LogUtils.error("ERROR - Session " + sessionId + " not found to add pose Errors");
        }
    }
}