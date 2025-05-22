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
@Table(name = "exercises", indexes = {
        @Index(name = "idx_exercise_name", columnList = "name")
})
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Exercise extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    @Column(nullable = false)
    String name;

    String description;

    @Column(columnDefinition = "text")
    String thumbnailUrl;

    @Column(columnDefinition = "text")
    String mediaUrl;

    Double met = 0.0;

    Integer durationMinutes = 0;

    Boolean isTrainingSupported = false;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "category_id", nullable = false)
    Category category;

    @OneToMany(mappedBy = "exercise", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<Step> steps;

    @OneToMany(mappedBy = "exercise")
    List<WorkoutSummary> workoutSummaries;
}
