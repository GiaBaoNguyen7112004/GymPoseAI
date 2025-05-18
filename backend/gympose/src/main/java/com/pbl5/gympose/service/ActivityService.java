package com.pbl5.gympose.service;

import com.pbl5.gympose.entity.Activity;
import com.pbl5.gympose.entity.WorkoutSummary;
import com.pbl5.gympose.payload.response.activity.PagingActivitiesResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;

import java.util.UUID;

public interface ActivityService {
    Activity save(Activity activity);

    @Async("taskExecutor")
    void createCaloriesConsumption(WorkoutSummary workoutSummary);

    PagingActivitiesResponse getUserActivities(UUID userId, Pageable pageable);
}
