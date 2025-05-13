package com.pbl5.gympose.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "targets")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Target extends AbstractEntity {
    @Id
    @GeneratedValue
    UUID id;
    Double caloriesBurned = 0.0;
    Double caloriesTarget = 500.0;
    LocalDateTime caloriesTargetFinishedTime;

    Double waterIntake = 0.0;
    Double waterTarget = 2.0;
    LocalDateTime waterTargetFinishedTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
}
