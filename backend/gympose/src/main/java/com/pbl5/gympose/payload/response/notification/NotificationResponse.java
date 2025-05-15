package com.pbl5.gympose.payload.response.notification;


import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.pbl5.gympose.enums.NotificationType;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationResponse {
    UUID id;
    NotificationType type;
    String title;
    String description;
    LocalDateTime createdAt;
    Boolean isRead;
    Map<String, Object> metaData;
}
