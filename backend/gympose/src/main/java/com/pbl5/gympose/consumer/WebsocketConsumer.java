package com.pbl5.gympose.consumer;

import com.pbl5.gympose.payload.message.AIResultMessage;
import com.pbl5.gympose.utils.CommonFunction;
import com.pbl5.gympose.utils.LogUtils;
import com.pbl5.gympose.utils.rabbitmq.RabbitMQConstant;
import com.pbl5.gympose.websocket.StompWebSocketSender;
import com.pbl5.gympose.websocket.WebSocketSessionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WebsocketConsumer {
    WebSocketSessionService sessionService;
    StompWebSocketSender stompWebSocketSender;

    @RabbitListener(queues = RabbitMQConstant.AI_RESULT_WS_QUEUE)
    public void handleResult(AIResultMessage message) {
        try {
            sessionService.sendMessageResultToClient(message.getSessionId(), CommonFunction.toJsonString(message));
        } catch (Exception e) {
            LogUtils.error("ERROR - send Message result to client " + e.getMessage());
            Throwable cause = e.getCause();
            if (cause != null) {
                LogUtils.error("ERROR - Cause: " + cause.getMessage());
                cause.printStackTrace();
            }
        }
        stompWebSocketSender.sendAIResult(message);
    }
}
