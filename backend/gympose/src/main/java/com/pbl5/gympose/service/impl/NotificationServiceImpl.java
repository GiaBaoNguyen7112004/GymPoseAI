package com.pbl5.gympose.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.pbl5.gympose.entity.Notification;
import com.pbl5.gympose.entity.Token;
import com.pbl5.gympose.entity.User;
import com.pbl5.gympose.entity.WorkoutSummary;
import com.pbl5.gympose.enums.NotificationType;
import com.pbl5.gympose.enums.TokenType;
import com.pbl5.gympose.exception.NotFoundException;
import com.pbl5.gympose.mapper.NotificationMapper;
import com.pbl5.gympose.payload.general.PageInfo;
import com.pbl5.gympose.payload.request.notification.NotificationRequest;
import com.pbl5.gympose.payload.response.notification.PagingNotificationsResponse;
import com.pbl5.gympose.repository.NotificationRepository;
import com.pbl5.gympose.service.NotificationService;
import com.pbl5.gympose.service.TokenService;
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
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationServiceImpl implements NotificationService {
    final NotificationMapper notificationMapper;
    final NotificationRepository notificationRepository;
    final UserService userService;
    final TokenService tokenService;

    @Value("${expo-url}")
    String expoUrl;

    @Override
    public void register(UUID userId, NotificationRequest request) {
        User user = userService.findById(userId);
        Optional<Token> tokenResult = tokenService.findByUserIdAndType(userId, TokenType.EXPO_PUSH_NOTIFICATION);
        if (tokenResult.isPresent()) {
            Token token = tokenResult.get();
            token.setToken(request.getPushToken());
            tokenService.save(token);
        } else {
            Token token = new Token();
            token.setType(TokenType.EXPO_PUSH_NOTIFICATION);
            token.setToken(request.getPushToken());
            user.getTokens().add(token);
            token.setUser(user);
            userService.save(user);
        }
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
    public void readAllNotifications(UUID userId) {
        List<Notification> notifications = notificationRepository.findAllByUser_Id(userId);
        notifications.forEach(notification -> notification.setIsRead(true));
        notificationRepository.saveAll(notifications);
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
    public void sendPushNotification(String expoToken, Notification notification) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // optional: viết ngày theo ISO-8601

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(URI.create(expoUrl))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(mapper.writeValueAsString(Map.of(
                            "to", expoToken,
                            "title", notification.getTitle(),
                            "body", notification.getDescription(),
                            "data", mapper.writeValueAsString(notificationMapper.toNotificationResponse(notification))
                    ))))
                    .build();

            client.sendAsync(httpRequest, HttpResponse.BodyHandlers.ofString())
                    .thenAccept(response -> LogUtils.info("Sent push: " + response.body()));
        } catch (Exception e) {
            LogUtils.error("Failed to send push notification : " + e.getMessage());
        }
    }

    @Override
    public long getNewNotificationNumber(UUID userId) {
        return notificationRepository.findAllByUser_IdAndIsNew(userId, Boolean.TRUE).size();
    }

    @Override
    public void resetNewNotifications(UUID userId) {
        List<Notification> notifications = notificationRepository.findAllByUser_IdAndIsNew(userId, Boolean.TRUE);
        notifications.forEach(notification -> notification.setIsNew(false));
        notificationRepository.saveAll(notifications);
    }

    @Override
    public Notification save(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public void unregister(NotificationRequest request) {
        tokenService.deleteToken(request.getPushToken());
    }

    @Override
    public void notifyWorkoutFinish(WorkoutSummary workoutSummary) {
        Map<String, Object> metadata = new HashMap<>();
        User user = workoutSummary.getUser();
        metadata.put("workout_id", workoutSummary.getId());

        Notification notification = new Notification();
        notification.setTitle("Congratulation! You just finished the workout");
        notification.setDescription("You have a new exercise in today plan");
        notification.setUser(user);
        notification.setType(NotificationType.WORKOUT);
        notification.setMetaData(metadata);

        tokenService.findAllByTypeAndUserId(TokenType.EXPO_PUSH_NOTIFICATION, user.getId()).forEach(
                token -> sendPushNotification(token.getToken(), save(notification)));
    }
}
