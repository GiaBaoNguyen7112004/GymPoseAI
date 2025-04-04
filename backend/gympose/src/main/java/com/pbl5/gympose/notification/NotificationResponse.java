package com.pbl5.gympose.notification;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationResponse {
    UUID id;
    NotificationType type;
    String title;
    String description;
    LocalDateTime createAt;
    Object content;

    public static NotificationResponse createNotificationResponse(Notification notification) {
        return NotificationResponse.builder()
                .id(notification.getId())
                .type(notification.getType())
                .title(notification.getTitle())
                .description(notification.getDescription())
                .createAt(notification.getCreatedAt())
                .content(notification.getType() == NotificationType.SUMMARY
                        ? SummaryResponse.builder().workoutHistoryId(notification.getData()).build()
                        : ReminderResponse.builder().reminder(notification.getData()).build())
                .build();
    }
}
