package com.pbl5.gympose.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pbl5.gympose.entity.Notification;
import com.pbl5.gympose.entity.Token;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.enums.TokenType;
import com.pbl5.gympose.exception.NotFoundException;
import com.pbl5.gympose.mapper.NotificationMapper;
import com.pbl5.gympose.payload.general.PageInfo;
import com.pbl5.gympose.payload.request.notification.NotificationRegisterRequest;
import com.pbl5.gympose.payload.request.notification.NotificationRequest;
import com.pbl5.gympose.payload.response.notification.NotificationResponse;
import com.pbl5.gympose.payload.response.notification.PagingNotificationsResponse;
import com.pbl5.gympose.repository.NotificationRepository;
import com.pbl5.gympose.service.NotificationService;
import com.pbl5.gympose.service.UserService;
import com.pbl5.gympose.utils.LogUtils;
import com.pbl5.gympose.utils.exception.ErrorMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationServiceImpl implements NotificationService {
    final NotificationMapper notificationMapper;
    final NotificationRepository notificationRepository;
    final UserService userService;

    @Value("${expo-url}")
    String expoUrl;

    @Override
    public void register(UUID userId, NotificationRegisterRequest request) {
        User user = userService.findById(userId);
        Token token = new Token();
        token.setType(TokenType.EXPO_PUSH_NOTIFICATION);
        token.setToken(request.getPushToken());
        user.getTokens().add(token);
        userService.save(user);
    }

    @Override
    public NotificationResponse createNotification(NotificationRequest notificationRequest) {
        User user = userService.findById(notificationRequest.getUserId());
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

    @Override
    public void sendPushNotification(String expoToken, NotificationRequest notificationRequest) {
        NotificationResponse notificationResponse = this.createNotification(notificationRequest);
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(URI.create(expoUrl))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(new ObjectMapper().writeValueAsString(Map.of(
                            "to", expoToken,
                            "title", notificationResponse.getTitle(),
                            "body", notificationResponse
                    ))))
                    .build();

            client.sendAsync(httpRequest, HttpResponse.BodyHandlers.ofString())
                    .thenAccept(response -> LogUtils.info("Sent push: " + response.body()));
        } catch (Exception e) {
            LogUtils.error("Failed to send push notification : " + e.getMessage());
        }
    }
}
