package com.pbl5.gympose.repository;

import com.pbl5.gympose.entity.WorkoutSummary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface WorkoutSummaryRepository extends JpaRepository<WorkoutSummary, UUID> {
    Page<WorkoutSummary> getWorkoutSummariesByUser_IdAndCreatedAtBetween(
            UUID userId,
            LocalDateTime from,
            LocalDateTime to,
            Pageable pageable
    );

    List<WorkoutSummary> findByUser_IdAndStartTimeBetween(UUID userId, LocalDateTime fromDate, LocalDateTime toDate);
}
