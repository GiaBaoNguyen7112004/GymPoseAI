package com.pbl5.gympose.service;

import com.pbl5.gympose.payload.request.target.TargetRequest;
import com.pbl5.gympose.payload.response.target.DetailTargetResponse;
import com.pbl5.gympose.payload.response.target.TargetCaloriesResponse;
import com.pbl5.gympose.payload.response.target.TargetResponse;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.List;
import java.util.UUID;

public interface TargetService {
    TargetCaloriesResponse getCaloriesTargetToday(UUID userId);

    TargetResponse getTarget(UUID userId);

    TargetResponse updateTarget(UUID userId, TargetRequest request);

    List<DetailTargetResponse> getWeeklyTarget(UUID userId);

    @Scheduled(cron = "0 0 0 * * *")
    void createDailyTargets();

    @Async("taskExecutor")
    void createUserTarget(UUID userId);
}
