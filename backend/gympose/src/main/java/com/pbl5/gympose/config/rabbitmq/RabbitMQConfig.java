package com.pbl5.gympose.config.rabbitmq;

import com.pbl5.gympose.utils.rabbitmq.RabbitMQConstant;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class RabbitMQConfig {
    @Bean
    public DirectExchange aiExchange() {
        return new DirectExchange(RabbitMQConstant.AI_EXCHANGE);
    }

    @Bean
    public Queue aiProcessQueue() {
        return new Queue(RabbitMQConstant.AI_PROCESS_QUEUE);
    }

    @Bean
    public Queue aiResultQueue() {
        return new Queue(RabbitMQConstant.AI_RESULT_QUEUE);
    }


    @Bean
    public Binding aiProcessBinding() {
        return BindingBuilder.bind(aiResultQueue()).to(aiExchange()).with(RabbitMQConstant.AI_RESULT_ROUTING_KEY);
    }

    @Bean
    public Binding aiResultBinding() {
        return BindingBuilder.bind(aiProcessQueue()).to(aiExchange()).with(RabbitMQConstant.AI_PROCESS_ROUTING_KEY);
    }
}