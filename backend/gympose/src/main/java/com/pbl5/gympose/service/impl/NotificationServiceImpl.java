package com.pbl5.gympose.service.impl;

import com.pbl5.gympose.entity.Notification;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.exception.NotFoundException;
import com.pbl5.gympose.mapper.NotificationMapper;
import com.pbl5.gympose.payload.general.PageInfo;
import com.pbl5.gympose.payload.request.notification.NotificationRequest;
import com.pbl5.gympose.payload.response.notification.NotificationResponse;
import com.pbl5.gympose.payload.response.notification.PagingNotificationsResponse;
import com.pbl5.gympose.repository.NotificationRepository;
import com.pbl5.gympose.service.NotificationService;
import com.pbl5.gympose.service.UserService;
import com.pbl5.gympose.utils.exception.ErrorMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotificationServiceImpl implements NotificationService {
    NotificationMapper notificationMapper;
    NotificationRepository notificationRepository;
    UserService userService;

    @Override
    public NotificationResponse createNotification(UUID userId, NotificationRequest notificationRequest) {
        User user = userService.findById(userId);
        Notification notification = notificationMapper.toNotification(notificationRequest);
        notification.setUser(user);

        return notificationMapper.toNotificationResponse(notificationRepository.save(notification));
    }

    @Override
    public PagingNotificationsResponse getAllNotifications(UUID userId, Pageable pageable) {
        Page<Notification> pages = notificationRepository.findAllByUser_Id(userId, pageable);
        PageInfo pageInfo =
                new PageInfo(pageable.getPageNumber() + 1, pages.getTotalPages(), pages.getTotalElements());
        return PagingNotificationsResponse.builder()
                .pageInfo(pageInfo)
                .notifications(pages.getContent().stream().map(notificationMapper::toNotificationResponse).toList())
                .build();
    }

    @Override
    public void readNotification(UUID notificationId) {
        Notification notification = this.findById(notificationId);
        notification.setIsRead(true);
        notificationRepository.save(notification);
    }

    @Override
    public Notification findById(UUID notificationId) {
        return notificationRepository.findById(notificationId).orElseThrow(()
                -> new NotFoundException(ErrorMessage.NOTIFICATION_NOT_FOUND));
    }

    @Override
    public void deleteById(UUID notificationId) {
        notificationRepository.deleteById(notificationId);
    }
}
