package com.pbl5.gympose.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "pose_errors")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PoseError extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    String aiResult;
    Integer repIndex;

    @ManyToOne
    @JoinColumn(name = "workout_summary_id", nullable = true)
    WorkoutSummary workoutSummary;
}
