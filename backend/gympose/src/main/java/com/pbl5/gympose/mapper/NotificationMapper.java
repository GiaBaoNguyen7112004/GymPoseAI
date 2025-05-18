package com.pbl5.gympose.mapper;

import com.pbl5.gympose.entity.Notification;
import com.pbl5.gympose.payload.response.notification.NotificationResponse;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface NotificationMapper {
    public NotificationResponse toNotificationResponse(Notification notification);

    @AfterMapping
    default void afterToNotificationResponse(Notification notification, @MappingTarget NotificationResponse response) {
        response.setMetaData(notification.getMetaData());
    }
}
