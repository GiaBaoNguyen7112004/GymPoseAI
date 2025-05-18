package com.pbl5.gympose.service;

import com.pbl5.gympose.entity.Activity;
import com.pbl5.gympose.entity.WorkoutSummary;
import com.pbl5.gympose.payload.response.activity.ActivityResponse;
import org.springframework.scheduling.annotation.Async;

import java.util.List;
import java.util.UUID;

public interface ActivityService {
    Activity save(Activity activity);

    @Async("taskExecutor")
    void createCaloriesConsumption(WorkoutSummary workoutSummary);

    List<ActivityResponse> getUserActivities(UUID userId);
}
