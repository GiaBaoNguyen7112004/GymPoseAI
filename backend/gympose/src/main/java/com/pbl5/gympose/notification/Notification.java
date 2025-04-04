package com.pbl5.gympose.notification;

import com.pbl5.gympose.entity.AbstractEntity;
import com.pbl5.gympose.entity.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "notifications")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Notification extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    @Enumerated(EnumType.STRING)
    NotificationType type;

    @Column(nullable = false)
    String title;

    @Column(nullable = false)
    String description;

    @Column(nullable = false)
    String data;

    @Column(nullable = false)
    Boolean isRead;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;
}
