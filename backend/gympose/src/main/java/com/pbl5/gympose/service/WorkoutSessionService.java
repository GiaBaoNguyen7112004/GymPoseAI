package com.pbl5.gympose.service;

import com.pbl5.gympose.websocket.WebSocketSessionInfo;
import org.springframework.web.socket.WebSocketSession;

public interface WorkoutSessionService {
    String startWorkoutSession(WebSocketSession session);

    void endWorkoutSession(WebSocketSessionInfo webSocketSessionInfo);
}
