package com.pbl5.gympose.service;

import com.pbl5.gympose.entity.Notification;
import com.pbl5.gympose.payload.request.notification.NotificationRegisterRequest;
import com.pbl5.gympose.payload.response.notification.PagingNotificationsResponse;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface NotificationService {
    void register(UUID userId, NotificationRegisterRequest request);

    PagingNotificationsResponse getAllNotifications(UUID userId, Pageable pageable);

    void readNotification(UUID notificationId);

    Notification findById(UUID notificationId);

    void deleteById(UUID notificationId);

    void sendPushNotification(String expoToken, Notification notification);

    long getNewNotificationNumber(UUID userId);

    void resetNewNotifications(UUID userId);

    Notification save(Notification notification);
}
