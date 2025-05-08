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
        LogUtils.info("Result-Id: " + message.getUserId());
        LogUtils.info("Result-Time: " + message.getTime());
        LogUtils.info("Result-Content: " + message.getContent());
        LogUtils.info("Result-Rep number: " + message.getRepNum());
    }
}