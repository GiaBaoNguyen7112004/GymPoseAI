package com.pbl5.gympose.mapper;

import com.pbl5.gympose.entity.Notification;
import com.pbl5.gympose.payload.request.notification.NotificationRequest;
import com.pbl5.gympose.payload.response.notification.NotificationResponse;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface NotificationMapper {
    public Notification toNotification(NotificationRequest request);

    public NotificationResponse toNotificationResponse(Notification notification);

    @AfterMapping
    default void afterToNotification(NotificationRequest request, @MappingTarget Notification notification) {
        notification.setMetaData(request.getMetaData());
    }

    @AfterMapping
    default void afterToNotificationResponse(Notification notification, @MappingTarget NotificationResponse response) {
        response.setMetaData(notification.getMetaData());
    }
}
