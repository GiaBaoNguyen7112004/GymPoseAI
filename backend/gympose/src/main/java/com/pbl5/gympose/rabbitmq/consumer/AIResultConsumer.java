package com.pbl5.gympose.rabbitmq.consumer;

import com.pbl5.gympose.payload.message.AIResultMessage;
import com.pbl5.gympose.utils.rabbitmq.RabbitMQConstant;
import com.pbl5.gympose.websocket.WebSocketSender;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AIResultConsumer {

    WebSocketSender webSocketSender;

    @RabbitListener(queues = RabbitMQConstant.AI_RESULT_QUEUE)
    public void handleResult(AIResultMessage message) {
        webSocketSender.send(message);
    }
}