package com.pbl5.gympose.controller;

import com.pbl5.gympose.entity.UserPrincipal;
import com.pbl5.gympose.payload.general.ResponseData;
import com.pbl5.gympose.security.annotation.CurrentUser;
import com.pbl5.gympose.service.ActivityService;
import com.pbl5.gympose.utils.ApiPath;
import com.pbl5.gympose.utils.FeedbackMessage;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiPath.AUTH)
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Activity API", description = "Activity API")
public class ActivityController {
    ActivityService activityService;

    @GetMapping(ApiPath.ACTIVITIES)
    public ResponseEntity<ResponseData> getUserActivities(@CurrentUser UserPrincipal userPrincipal) {
        ResponseData responseData = ResponseData.success(activityService.getUserActivities(userPrincipal.getId()),
                FeedbackMessage.ACTIVITIES_RETRIEVED);
        return ResponseEntity.ok(responseData);
    }
}
