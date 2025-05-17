package com.pbl5.gympose.consumer;

import com.pbl5.gympose.payload.message.AIResultMessage;
import com.pbl5.gympose.utils.CommonFunction;
import com.pbl5.gympose.utils.rabbitmq.RabbitMQConstant;
import com.pbl5.gympose.websocket.RawWebSocketHandler;
import com.pbl5.gympose.websocket.StompWebSocketSender;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WebsocketConsumer {
    RawWebSocketHandler rawWebSocketHandler;
    StompWebSocketSender stompWebSocketSender;

    @RabbitListener(queues = RabbitMQConstant.AI_RESULT_WS_QUEUE)
    public void handleResult(AIResultMessage message) {
        rawWebSocketHandler.sendResultToClient(message.getSessionId(), CommonFunction.toJsonString(message));
        stompWebSocketSender.sendAIResult(message);
    }
}
