package com.pbl5.gympose.config.rabbitmq;

import com.pbl5.gympose.utils.rabbitmq.RabbitMQConstant;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jackson2JsonMessageConverter());
        return rabbitTemplate;
    }

    @Bean
    public MessageConverter jackson2JsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }


    // === Exchanges ===
    @Bean
    public DirectExchange aiProcessExchange() {
        return new DirectExchange(RabbitMQConstant.AI_PROCESS_EXCHANGE);
    }

    @Bean
    public DirectExchange aiResultExchange() {
        return new DirectExchange(RabbitMQConstant.AI_RESULT_EXCHANGE);
    }

    @Bean
    public FanoutExchange aiResultFanoutExchange() {
        return new FanoutExchange(RabbitMQConstant.AI_RESULT_FANOUT_EXCHANGE);
    }

    // === Queues ===
    @Bean
    public Queue aiProcessingQueue() {
        return new Queue(RabbitMQConstant.AI_PROCESSING_QUEUE);
    }

    @Bean
    public Queue aiResultQueue() {
        return new Queue(RabbitMQConstant.AI_RESULT_QUEUE);
    }

    @Bean
    public Queue aiResultDbQueue() {
        return new Queue(RabbitMQConstant.AI_RESULT_DB_QUEUE);
    }

    @Bean
    public Queue aiResultLogQueue() {
        return new Queue(RabbitMQConstant.AI_RESULT_LOG_QUEUE);
    }

    @Bean
    public Queue aiResultWsQueue() {
        return new Queue(RabbitMQConstant.AI_RESULT_WS_QUEUE);
    }

    // === Bindings ===
    @Bean
    public Binding bindAiProcessingQueue() {
        return BindingBuilder.bind(aiProcessingQueue())
                .to(aiProcessExchange())
                .with(RabbitMQConstant.AI_PROCESS_ROUTING_KEY);
    }

    @Bean
    public Binding bindAiResultQueue() {
        return BindingBuilder.bind(aiResultQueue())
                .to(aiResultExchange())
                .with(RabbitMQConstant.AI_RESULT_ROUTING_KEY);
    }

    @Bean
    public Binding bindAiResultDbQueue() {
        return BindingBuilder.bind(aiResultDbQueue())
                .to(aiResultFanoutExchange());
    }

    @Bean
    public Binding bindAiResultLogQueue() {
        return BindingBuilder.bind(aiResultLogQueue())
                .to(aiResultFanoutExchange());
    }

    @Bean
    public Binding bindAiResultWsQueue() {
        return BindingBuilder.bind(aiResultWsQueue())
                .to(aiResultFanoutExchange());
    }
}
