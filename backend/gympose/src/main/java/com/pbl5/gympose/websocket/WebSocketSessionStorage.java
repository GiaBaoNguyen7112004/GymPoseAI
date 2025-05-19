package com.pbl5.gympose.websocket;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebSocketSessionStorage {
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    public WebSocketSession getSession(final String sessionId) {
        return sessions.get(sessionId);
    }

    public void addWebSocketSession(final String sessionId, final WebSocketSession session) {
        sessions.put(sessionId, session);
    }

    public void removeWebSocketSession(final String sessionId) {
        sessions.remove(sessionId);
    }
}
