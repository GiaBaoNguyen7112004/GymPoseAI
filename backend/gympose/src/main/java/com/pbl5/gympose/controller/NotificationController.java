package com.pbl5.gympose.controller;

import com.pbl5.gympose.entity.UserPrincipal;
import com.pbl5.gympose.payload.general.ResponseData;
import com.pbl5.gympose.payload.request.notification.NotificationRequest;
import com.pbl5.gympose.payload.response.notification.PagingNotificationsResponse;
import com.pbl5.gympose.security.annotation.CurrentUser;
import com.pbl5.gympose.service.NotificationService;
import com.pbl5.gympose.utils.ApiPath;
import com.pbl5.gympose.utils.FeedbackMessage;
import com.pbl5.gympose.utils.PagingUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(ApiPath.NOTIFICATIONS)
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Notification API", description = "Notification management")
public class NotificationController {
    NotificationService notificationService;

    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "register notification")
    @PostMapping
    public ResponseEntity<ResponseData> register(@CurrentUser UserPrincipal userPrincipal,
                                                 @RequestBody NotificationRequest request) {
        notificationService.register(userPrincipal.getId(), request);
        ResponseData responseData = ResponseData.successWithoutMetaAndData(FeedbackMessage.NOTIFICATION_REGISTERED);
        return ResponseEntity.ok(responseData);
    }

    @SecurityRequirement(name = "bearerAuth")
    @GetMapping
    @Operation(summary = "Get user notifications")
    public ResponseEntity<ResponseData> getUserNotifications(@RequestParam(name = "sort_by", defaultValue = "created_at") String sortBy,
                                                             @RequestParam(name = "order", defaultValue = "desc") String order,
                                                             @RequestParam(name = "page", defaultValue = "1") int page,
                                                             @RequestParam(name = "limit", defaultValue = "10") int paging,
                                                             @CurrentUser UserPrincipal userPrincipal
    ) {
        Pageable pageable = PagingUtils.makePageRequest(sortBy, order, page, paging);
        PagingNotificationsResponse pagingNotificationsResponse =
                notificationService.getAllNotifications(userPrincipal.getId(), pageable);
        ResponseData responseData = ResponseData.successWithMeta(pagingNotificationsResponse.getNotifications()
                , pagingNotificationsResponse.getPageInfo(), FeedbackMessage.NOTIFICATIONS_RETRIEVED);
        return ResponseEntity.ok(responseData);
    }

    @SecurityRequirement(name = "bearerAuth")
    @PatchMapping(ApiPath.NOTIFICATION_BY_ID)
    @Operation(summary = "Read notification")
    public ResponseEntity<ResponseData> readNotification(@PathVariable(name = "notification-id") UUID notificationId) {
        notificationService.readNotification(notificationId);
        ResponseData responseData = ResponseData.successWithoutMetaAndData(FeedbackMessage.NOTIFICATION_READ);
        return ResponseEntity.ok(responseData);
    }

    @SecurityRequirement(name = "bearerAuth")
    @GetMapping(ApiPath.NEW_NOTIFICATIONS_NUMBER)
    @Operation(summary = "Get new notification number")
    public ResponseEntity<ResponseData> getNewNotificationNumber(@CurrentUser UserPrincipal userPrincipal) {
        ResponseData responseData = ResponseData
                .success(notificationService.getNewNotificationNumber(userPrincipal.getId()),
                        FeedbackMessage.NEW_NOTIFICATIONS_NUMBER_RETRIEVED);
        return ResponseEntity.ok(responseData);
    }

    @SecurityRequirement(name = "bearerAuth")
    @PatchMapping(ApiPath.NOTIFICATION_RESET)
    @Operation(summary = "reset new notification number")
    public ResponseEntity<ResponseData> resetNewNotificationsNumber(@CurrentUser UserPrincipal userPrincipal) {
        notificationService.resetNewNotifications(userPrincipal.getId());
        ResponseData responseData = ResponseData.successWithoutMetaAndData(FeedbackMessage.NEW_NOTIFICATIONS_NUMBER_RESET);
        return ResponseEntity.ok(responseData);
    }

    @Operation(summary = "read all notifications")
    @SecurityRequirement(name = "bearerAuth")
    @PatchMapping(ApiPath.NOTIFICATIONS_READ)
    public ResponseEntity<ResponseData> readAllNotification(@CurrentUser UserPrincipal userPrincipal) {
        notificationService.readAllNotifications(userPrincipal.getId());
        ResponseData responseData = ResponseData.successWithoutMetaAndData(FeedbackMessage.NOTIFICATIONS_READ);
        return ResponseEntity.ok(responseData);
    }


    @SecurityRequirement(name = "bearerAuth")
    @PostMapping(ApiPath.NOTIFICATION_UNREGISTER)
    @Operation(summary = "unregister notifications")
    public ResponseEntity<ResponseData> unregister(@RequestBody NotificationRequest request) {
        notificationService.unregister(request);
        ResponseData responseData = ResponseData.successWithoutMetaAndData(FeedbackMessage.NOTIFICATION_UNREGISTERD);
        return ResponseEntity.ok(responseData);
    }
}
