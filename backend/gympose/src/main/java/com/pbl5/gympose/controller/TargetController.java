package com.pbl5.gympose.controller;

import com.pbl5.gympose.entity.UserPrincipal;
import com.pbl5.gympose.payload.general.ResponseData;
import com.pbl5.gympose.payload.request.target.TargetRequest;
import com.pbl5.gympose.security.annotation.CurrentUser;
import com.pbl5.gympose.service.TargetService;
import com.pbl5.gympose.utils.ApiPath;
import com.pbl5.gympose.utils.FeedbackMessage;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiPath.TARGET)
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Target API", description = "Target management")
public class TargetController {
    TargetService targetService;

    @SecurityRequirement(name = "bearerAuth")
    @GetMapping(ApiPath.TARGET_CALORIES_TODAY)
    public ResponseEntity<ResponseData> getTargetCaloriesToday(@CurrentUser UserPrincipal userPrincipal) {
        ResponseData responseData = ResponseData.success(targetService.getCaloriesTargetToday(userPrincipal.getId()),
                FeedbackMessage.TARGET_CALORIES_RETRIEVED);
        return ResponseEntity.ok(responseData);
    }

    @SecurityRequirement(name = "bearerAuth")
    @GetMapping(ApiPath.TARGET_TODAY)
    public ResponseEntity<ResponseData> getTodayTarget(@CurrentUser UserPrincipal userPrincipal) {
        ResponseData responseData = ResponseData.success(targetService.getTarget(userPrincipal.getId()),
                FeedbackMessage.TARGET_TODAY_RETRIEVED);
        return ResponseEntity.ok(responseData);
    }

    @SecurityRequirement(name = "bearerAuth")
    @PatchMapping(ApiPath.TARGET_TODAY)
    public ResponseEntity<ResponseData> updateTodayTarget(@CurrentUser UserPrincipal userPrincipal,
                                                          @RequestBody TargetRequest targetRequest) {
        ResponseData responseData = ResponseData.success(targetService.updateTarget(userPrincipal.getId(), targetRequest),
                FeedbackMessage.TARGET_TODAY_UPDATED);
        return ResponseEntity.ok(responseData);
    }

    @SecurityRequirement(name = "bearerAuth")
    @GetMapping(ApiPath.TARGET_WEEKLY)
    public ResponseEntity<ResponseData> getWeeklyTarget(@CurrentUser UserPrincipal userPrincipal) {
        ResponseData responseData = ResponseData.success(targetService.getWeeklyTarget(userPrincipal.getId()),
                FeedbackMessage.TARGET_WEEKLY_RETRIEVED);
        return ResponseEntity.ok(responseData);
    }

}
