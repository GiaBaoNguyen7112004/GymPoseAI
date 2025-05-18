package com.pbl5.gympose.service;

import com.pbl5.gympose.entity.Notification;
import com.pbl5.gympose.payload.request.notification.NotificationRequest;
import com.pbl5.gympose.payload.response.notification.PagingNotificationsResponse;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface NotificationService {
    void register(UUID userId, NotificationRequest request);

    PagingNotificationsResponse getAllNotifications(UUID userId, Pageable pageable);

    void readNotification(UUID notificationId);

    void readAllNotifications(UUID userId);

    Notification findById(UUID notificationId);

    void deleteById(UUID notificationId);

    void sendPushNotification(String expoToken, Notification notification);

    long getNewNotificationNumber(UUID userId);

    void resetNewNotifications(UUID userId);

    Notification save(Notification notification);

    void unregister(NotificationRequest request);
}
