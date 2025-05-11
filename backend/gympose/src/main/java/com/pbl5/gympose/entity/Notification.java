package com.pbl5.gympose.entity;

import com.pbl5.gympose.enums.NotificationType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;
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
    @GeneratedValue
    UUID id;

    @Enumerated(EnumType.STRING)
    NotificationType type;

    String title;

    String description;

    Boolean isRead = false;

    Boolean isNew = true;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> metaData;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
}
