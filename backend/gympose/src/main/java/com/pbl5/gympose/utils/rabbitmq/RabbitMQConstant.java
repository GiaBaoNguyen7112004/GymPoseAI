package com.pbl5.gympose.utils.rabbitmq;

public class RabbitMQConstant {

    // === Exchanges ===
    public static final String AI_PROCESS_EXCHANGE = "gympose.ai.process.direct";        // Backend → AI server
    public static final String AI_RESULT_EXCHANGE = "gympose.ai.result.direct";          // AI server → Backend
    public static final String AI_RESULT_FANOUT_EXCHANGE = "gympose.ai.result.fanout";   // Backend → DB, Log, WS


    // === Queues ===
    public static final String AI_PROCESSING_QUEUE = "gympose.ai.process.ai-server";   // AI server consumes
    public static final String AI_RESULT_QUEUE = "gympose.ai.result.backend";          // Backend consumes
    public static final String AI_RESULT_DB_QUEUE = "gympose.ai.result.db";            // Backend → DB save
    public static final String AI_RESULT_LOG_QUEUE = "gympose.ai.result.log";          // Backend → log
    public static final String AI_RESULT_WS_QUEUE = "gympose.ai.result.ws";            // Backend → websocket


    // === Routing Keys ===
    public static final String AI_PROCESS_ROUTING_KEY = "ai.process.ai-server";
    public static final String AI_RESULT_ROUTING_KEY = "ai.result.backend";

    private RabbitMQConstant() {
    }
}

