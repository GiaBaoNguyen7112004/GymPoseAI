package com.pbl5.gympose.entity;


import com.pbl5.gympose.enums.ActivityType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "activities")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Activity extends AbstractEntity {
    @Id
    @GeneratedValue
    UUID id;
    ActivityType activity;
    String name;
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
}
