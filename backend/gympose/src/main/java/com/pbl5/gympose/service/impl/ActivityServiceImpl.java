package com.pbl5.gympose.service.impl;

import com.pbl5.gympose.entity.Activity;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.entity.WorkoutSummary;
import com.pbl5.gympose.enums.ActivityType;
import com.pbl5.gympose.mapper.ActivityMapper;
import com.pbl5.gympose.payload.general.PageInfo;
import com.pbl5.gympose.payload.response.activity.PagingActivitiesResponse;
import com.pbl5.gympose.repository.ActivityRepository;
import com.pbl5.gympose.service.ActivityService;
import com.pbl5.gympose.utils.WorkoutUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

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
    public PagingActivitiesResponse getUserActivities(UUID userId, Pageable pageable) {
        Page<Activity> pages = activityRepository.findAllByUser_Id(userId, pageable);
        PageInfo pageInfo =
                new PageInfo(pageable.getPageNumber() + 1, pages.getTotalPages(), pages.getTotalElements());
        return PagingActivitiesResponse.builder()
                .pageInfo(pageInfo)
                .activities(pages.getContent().stream().map(activityMapper::toActivityResponse).toList())
                .build();
    }
}
