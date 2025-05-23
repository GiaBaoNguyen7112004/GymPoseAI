package com.pbl5.gympose.service.impl;

import com.pbl5.gympose.entity.Target;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.exception.BadRequestException;
import com.pbl5.gympose.mapper.TargetMapper;
import com.pbl5.gympose.payload.request.target.TargetRequest;
import com.pbl5.gympose.payload.response.target.*;
import com.pbl5.gympose.repository.TargetRepository;
import com.pbl5.gympose.service.TargetService;
import com.pbl5.gympose.service.UserService;
import com.pbl5.gympose.utils.exception.ErrorMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TargetServiceImpl implements TargetService {
    TargetRepository targetRepository;
    TargetMapper targetMapper;
    UserService userService;

    @Override
    public TargetCaloriesResponse getCaloriesTargetToday(UUID userId) {
        return targetMapper.toTargetCaloriesResponse(getTodayTarget(userId));
    }

    @Override
    public TargetResponse getTarget(UUID userId) {
        return targetMapper.toTargetResponse(getTodayTarget(userId));
    }

    @Override
    public TargetResponse updateTarget(UUID userId, TargetRequest request) {
        Target target = getTodayTarget(userId);
        targetMapper.updateTarget(target, request);
        return targetMapper.toTargetResponse(targetRepository.save(target));
    }

    @Override
    public List<DetailTargetResponse> getWeeklyTarget(UUID userId) {
        return getThisWeekTarget(userId).stream().map(target -> {
            return DetailTargetResponse.builder()
                    .calories(CaloriesTargetResponse.builder()
                            .caloriesTarget(target.getCaloriesTarget())
                            .caloriesBurned(target.getCaloriesBurned())
                            .date(target.getCaloriesTargetFinishedTime())
                            .build())
                    .water(WaterTargetResponse.builder()
                            .waterTarget(target.getWaterTarget())
                            .waterIntake(target.getWaterIntake())
                            .date(target.getWaterTargetFinishedTime())
                            .build())
                    .build();
        }).toList();
    }

    public Target getTodayTarget(UUID userId) {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);

        List<Target> targets = targetRepository.findByUser_IdAndCreatedAtBetween(userId, startOfDay, endOfDay);
        if (targets != null) {
            return targets.get(0);
        } else throw new BadRequestException(ErrorMessage.TARGET_NOT_FOUND);
    }

    public List<Target> getThisWeekTarget(UUID userId) {
        LocalDate today = LocalDate.now();

        // Xác định ngày đầu tuần (thứ 2)
        LocalDate startOfWeek = today.with(DayOfWeek.MONDAY);
        // Xác định ngày cuối tuần (chủ nhật)
        LocalDate endOfWeek = today.with(DayOfWeek.SUNDAY);

        LocalDateTime startDateTime = startOfWeek.atStartOfDay();
        LocalDateTime endDateTime = endOfWeek.atTime(LocalTime.MAX);

        return targetRepository.findByUser_IdAndCreatedAtBetween(userId, startDateTime, endDateTime);
    }

    @Scheduled(cron = "0 0 0 * * *")
    @Override
    public void createDailyTargets() {
        List<Target> targets = new ArrayList<>();
        for (User user : userService.findAll()) {
            if (Boolean.FALSE.equals(user.getIsEnabled())) continue;
            Target target = new Target();
            target.setUser(user);
            targets.add(target);
        }
        targetRepository.saveAll(targets);
    }

    @Async("taskExecutor")
    @Override
    public void createUserTarget(UUID userId) {
        Target target = new Target();
        target.setUser(userService.findById(userId));
        targetRepository.save(target);
    }
}
