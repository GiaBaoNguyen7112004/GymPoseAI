package com.pbl5.gympose.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "categories")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;
    String name;

    @OneToMany(mappedBy = "category", orphanRemoval = true, cascade = CascadeType.ALL)
    List<Exercise> exercises = new ArrayList<>();
}
