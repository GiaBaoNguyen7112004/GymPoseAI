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
@Table(name = "steps")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Step extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    @Column(nullable = false)
    String title;

    @Column(nullable = false, columnDefinition = "text")
    String description;

    @Column(nullable = false, name = "step_number")
    Integer stepNumber;

    @ManyToOne
    @JoinColumn(nullable = false, name = "exercise_id")
    Exercise exercise;
}
