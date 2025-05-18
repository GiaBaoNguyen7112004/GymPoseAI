package com.pbl5.gympose.service.impl;

import com.pbl5.gympose.entity.Activity;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.entity.WorkoutSummary;
import com.pbl5.gympose.enums.ActivityType;
import com.pbl5.gympose.mapper.ActivityMapper;
import com.pbl5.gympose.payload.response.activity.ActivityResponse;
import com.pbl5.gympose.repository.ActivityRepository;
import com.pbl5.gympose.service.ActivityService;
import com.pbl5.gympose.utils.WorkoutUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ActivityServiceImpl implements ActivityService {
    ActivityRepository activityRepository;
    ActivityMapper activityMapper;

    @Override
    public Activity save(Activity activity) {
        return activityRepository.save(activity);
    }

    @Async("taskExecutor")
    @Override
    public void createCaloriesConsumption(WorkoutSummary workoutSummary) {
        User user = workoutSummary.getUser();
        Double caloriesBurned = WorkoutUtils
                .getCaloriesBurned(workoutSummary, user.getWeight(), workoutSummary.getExercise());
        Activity activity = new Activity();
        activity.setActivity(ActivityType.CALORIES_CONSUMPTION);
        activity.setName("Burned " + caloriesBurned + " calories");
        activity.setUser(user);
        activityRepository.save(activity);
    }

    @Override
    public List<ActivityResponse> getUserActivities(UUID userId) {
        return activityMapper.toActivityResponses(activityRepository.findAllByUser_Id(userId));
    }
}
