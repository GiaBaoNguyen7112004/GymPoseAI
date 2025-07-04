package com.pbl5.gympose.consumer;

import com.pbl5.gympose.payload.message.AIResultMessage;
import com.pbl5.gympose.utils.LogUtils;
import com.pbl5.gympose.utils.rabbitmq.RabbitMQConstant;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LoggingConsumer {
    @RabbitListener(queues = RabbitMQConstant.AI_RESULT_LOG_QUEUE)
    public void handleResult(AIResultMessage message) {
        try {
            LogUtils.info("INFO - Result from AI SERVER -Time: " + message.getTime());
            LogUtils.info("INFO - Result from AI SERVER -Content: " + message.getContent());
            LogUtils.info("INFO - Result from AI SERVER -Rep number: " + message.getRepIndex());
            LogUtils.info("INFO - Result from AI SERVER -User Id: " + message.getUserId());
            LogUtils.info("INFO - Result from AI SERVER - SessionId: " + message.getSessionId());
        } catch (Exception e) {
            LogUtils.error("ERROR - AI Result consumer " + e.getMessage());
            Throwable cause = e.getCause();
            if (cause != null) {
                LogUtils.error("ERROR - Cause: " + cause.getMessage());
                cause.printStackTrace();
            }
        }
    }
}