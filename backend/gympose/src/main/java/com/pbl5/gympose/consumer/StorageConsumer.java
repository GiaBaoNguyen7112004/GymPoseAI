package com.pbl5.gympose.consumer;

import com.pbl5.gympose.entity.PoseError;
import com.pbl5.gympose.payload.message.AIResultMessage;
import com.pbl5.gympose.utils.rabbitmq.RabbitMQConstant;
import com.pbl5.gympose.websocket.RawWebSocketHandler;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StorageConsumer {
    RawWebSocketHandler rawWebSocketHandler;

    @RabbitListener(queues = RabbitMQConstant.AI_RESULT_DB_QUEUE)
    public void handleResult(AIResultMessage message) {
        PoseError poseError = new PoseError();
        poseError.setAiResult(message.getContent());
        poseError.setRepIndex(message.getRepNum());

        rawWebSocketHandler.addSessionPoseError(message.getSessionId(), poseError);
    }
}
