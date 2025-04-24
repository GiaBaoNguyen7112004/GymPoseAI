package com.pbl5.gympose.websocket;

import com.pbl5.gympose.payload.message.AIResultMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WebSocketSender {
    SimpMessagingTemplate messagingTemplate;

    public void send(AIResultMessage message) {
        messagingTemplate.convertAndSend("/pose-error/user/" + message.getUserId(), message);
    }
}