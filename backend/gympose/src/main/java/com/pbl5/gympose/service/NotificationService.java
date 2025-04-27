package com.pbl5.gympose.service;

import com.pbl5.gympose.entity.Notification;
import com.pbl5.gympose.payload.request.notification.NotificationRequest;
import com.pbl5.gympose.payload.response.notification.NotificationResponse;
import com.pbl5.gympose.payload.response.notification.PagingNotificationsResponse;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface NotificationService {
    NotificationResponse createNotification(UUID userId, NotificationRequest notificationRequest);

    PagingNotificationsResponse getAllNotifications(UUID userId, Pageable pageable);

    void readNotification(UUID notificationId);

    Notification findById(UUID notificationId);

    void deleteById(UUID notificationId);
}
