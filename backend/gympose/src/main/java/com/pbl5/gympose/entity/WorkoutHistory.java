package com.pbl5.gympose.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "workout_histories")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WorkoutHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    Integer durationSec;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    Exercise exercise;

    @OneToMany(mappedBy = "workoutHistory", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<PoseError> poseErrors;
}
