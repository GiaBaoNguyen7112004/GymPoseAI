package com.pbl5.gympose.entity;


import com.pbl5.gympose.enums.TokenType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tokens")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Token extends AbstractEntity {
    @Id
    @GeneratedValue
    UUID id;
    String token;

    @Enumerated(EnumType.STRING)
    TokenType type;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    User user;
}
