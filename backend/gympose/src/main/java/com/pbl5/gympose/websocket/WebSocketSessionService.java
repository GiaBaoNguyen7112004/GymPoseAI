package com.pbl5.gympose.websocket;

import com.pbl5.gympose.entity.PoseError;
import com.pbl5.gympose.payload.request.workoutsummary.PoseErrorImageRequest;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface WebSocketSessionService {
    WebSocketSession getSession(String sessionId);

    void sendMessageAfterConnection(WebSocketSession session, UUID workoutSummaryId) throws IOException;

    void initSession(WebSocketSession session, UUID userId, UUID workoutSummaryId,
                     UUID exerciseId);

    void addSessionPoseError(String sessionId, PoseError poseError);

    void sendMessage(WebSocketSession session, TextMessage textMessage) throws IOException;

    void sendMessageResultToClient(String sessionId, String message) throws IOException;

    void removeSession(String sessionId);

    void addImageUrlsToPoseErrors(String sessionId, List<PoseErrorImageRequest> poseErrorsImages);
}
