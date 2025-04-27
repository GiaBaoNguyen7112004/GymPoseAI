package com.pbl5.gympose.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "workout_summaries")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WorkoutSummary extends AbstractEntity {
    @Id
    @GeneratedValue
    UUID id;
    Integer durationMinutes;
    LocalDateTime startTime;
    LocalDateTime endTime;
    Integer repCount;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    Exercise exercise;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @OneToMany(mappedBy = "workoutSummary", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<PoseError> poseErrors = new ArrayList<>();
}
