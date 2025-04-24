package com.pbl5.gympose.rabbitmq.producer;

import com.pbl5.gympose.payload.message.AIProcessMessage;
import com.pbl5.gympose.utils.rabbitmq.RabbitMQConstant;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AIMessageProducer {
    RabbitTemplate rabbitTemplate;

    public void sendMessage(AIProcessMessage message) {
        rabbitTemplate.convertAndSend(RabbitMQConstant.AI_EXCHANGE, RabbitMQConstant.AI_PROCESS_ROUTING_KEY, message);
    }
}