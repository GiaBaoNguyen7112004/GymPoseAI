package com.pbl5.gympose.entity;

import com.pbl5.gympose.enums.AuthProvider;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_providers")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserProvider {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    @Enumerated(EnumType.STRING)
    AuthProvider authProvider;

    @Column(nullable = false)
    String providerId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;
}
