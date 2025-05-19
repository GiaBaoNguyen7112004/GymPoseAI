package com.pbl5.gympose.service;

import org.springframework.web.socket.WebSocketSession;

import java.util.UUID;

public interface WorkoutSessionService {

    UUID startWorkoutSession(WebSocketSession session, UUID userId, UUID exerciseId, UUID workoutSummaryId);

    void endWorkoutSession(WebSocketSession session);

//    void saveSessionPoseErrors(String sessionId, Map<String, String> poseErrorsImageUrl);
}
