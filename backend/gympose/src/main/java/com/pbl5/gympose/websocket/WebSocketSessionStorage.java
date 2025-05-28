package com.pbl5.gympose.websocket;

import com.pbl5.gympose.utils.LogUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebSocketSessionStorage {
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    public WebSocketSession getSession(final String sessionId) {
        try {
            synchronized (sessions) {
                LogUtils.info("INFO - SESSION ID FROM GET SESSION IN STORAGE " + sessionId);
                return sessions.get(sessionId);
            }
        } catch (Exception e) {
            LogUtils.error("INFO - Get session from storage failed");
            Throwable cause = e.getCause();
            if (cause != null) {
                cause.printStackTrace();
            }
        }

        return null;
    }

    public void addWebSocketSession(final String sessionId, final WebSocketSession session) {
        synchronized (sessions) {
            sessions.put(sessionId, session);
        }
    }

    public void removeWebSocketSession(final String sessionId) {
        synchronized (sessions) {
            sessions.remove(sessionId);
        }
    }
}
