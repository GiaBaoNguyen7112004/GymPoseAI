package com.pbl5.gympose.controller;

import com.pbl5.gympose.entity.UserPrincipal;
import com.pbl5.gympose.payload.general.ResponseData;
import com.pbl5.gympose.payload.request.notification.NotificationRequest;
import com.pbl5.gympose.security.annotation.CurrentUser;
import com.pbl5.gympose.service.NotificationService;
import com.pbl5.gympose.utils.ApiPath;
import com.pbl5.gympose.utils.FeedbackMessage;
import com.pbl5.gympose.utils.PagingUtils;
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
    @PostMapping
    public ResponseEntity<ResponseData> createNotification(@RequestBody NotificationRequest request) {
        ResponseData responseData = ResponseData.success(notificationService.createNotification(request.getUserId(),
                request), FeedbackMessage.NOTIFICATION_CREATED);
        return ResponseEntity.ok(responseData);
    }

    @GetMapping
    public ResponseEntity<ResponseData> getUserNotifications(@RequestParam(name = "sort", defaultValue = "created_at") String sortBy,
                                                             @RequestParam(name = "order", defaultValue = "desc") String order,
                                                             @RequestParam(name = "page", defaultValue = "1") int page,
                                                             @RequestParam(name = "paging", defaultValue = "10") int paging,
                                                             @CurrentUser UserPrincipal userPrincipal
    ) {
        Pageable pageable = PagingUtils.makePageRequest(sortBy, order, page, paging);
        ResponseData responseData = ResponseData.success(notificationService.getAllNotifications(userPrincipal.getId(),
                pageable), FeedbackMessage.NOTIFICATIONS_RETRIEVED);
        return ResponseEntity.ok(responseData);
    }

    @PatchMapping(ApiPath.NOTIFICATION_BY_ID)
    public ResponseEntity<ResponseData> readNotification(@PathVariable(name = "notification-id") UUID notificationId) {
        notificationService.readNotification(notificationId);
        ResponseData responseData = ResponseData.successWithoutMetaAndData(FeedbackMessage.NOTIFICATION_READ);
        return ResponseEntity.ok(responseData);
    }

    @DeleteMapping(ApiPath.NOTIFICATION_BY_ID)
    public ResponseEntity<ResponseData> deleteNotification(@PathVariable(name = "notification-id") UUID notificationId) {
        notificationService.deleteById(notificationId);
        ResponseData responseData = ResponseData.successWithoutMetaAndData(FeedbackMessage.NOTIFICATION_DELETED);
        return ResponseEntity.ok(responseData);
    }
}
