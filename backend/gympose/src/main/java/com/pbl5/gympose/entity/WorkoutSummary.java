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
    LocalDateTime startTime;
    Integer elapsedTime = 0;
    Integer repCount;
    Integer durationMinutes;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    Exercise exercise;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
 
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "workout_summary_id")
    List<PoseError> poseErrors = new ArrayList<>();

    public List<PoseError> getPoseErrors() {
        if (poseErrors == null) {
            poseErrors = new ArrayList<>();
        }
        return poseErrors;
    }
}
