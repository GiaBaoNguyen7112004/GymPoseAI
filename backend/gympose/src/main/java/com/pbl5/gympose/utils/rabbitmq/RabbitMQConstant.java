package com.pbl5.gympose.utils.rabbitmq;

public class RabbitMQConstant {
    public static final String AI_EXCHANGE = "ai-exchange";

    public static final String AI_PROCESS_QUEUE = "ai-process-queue";
    public static final String AI_PROCESS_ROUTING_KEY = "ai.process";

    public static final String AI_RESULT_QUEUE = "ai-result-queue";
    public static final String AI_RESULT_ROUTING_KEY = "ai.result";

    private RabbitMQConstant() {
    }
}
