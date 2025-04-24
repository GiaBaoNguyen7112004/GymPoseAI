package com.pbl5.gympose.websocket;

import com.pbl5.gympose.payload.message.AIProcessMessage;
import com.pbl5.gympose.rabbitmq.producer.AIMessageProducer;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WebSocketController {
    AIMessageProducer aiMessageProducer;

    @MessageMapping("/client/message")
    public void handleUserMessage(AIProcessMessage message) {
        aiMessageProducer.sendMessage(message);
    }
}
