package com.pbl5.gympose.controller;

import com.pbl5.gympose.entity.UserPrincipal;
import com.pbl5.gympose.payload.general.ResponseData;
import com.pbl5.gympose.payload.response.activity.PagingActivitiesResponse;
import com.pbl5.gympose.security.annotation.CurrentUser;
import com.pbl5.gympose.service.ActivityService;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiPath.ACTIVITIES)
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Activity API", description = "Activity API")
public class ActivityController {
    ActivityService activityService;

    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "get user activities")
    @GetMapping
    public ResponseEntity<ResponseData> getUserActivities(@RequestParam(name = "sort_by", defaultValue = "created_at") String sortBy,
                                                          @RequestParam(name = "order", defaultValue = "desc") String order,
                                                          @RequestParam(name = "page", defaultValue = "1") int page,
                                                          @RequestParam(name = "limit", defaultValue = "10") int paging,
                                                          @CurrentUser UserPrincipal userPrincipal) {
        Pageable pageable = PagingUtils.makePageRequest(sortBy, order, page, paging);
        PagingActivitiesResponse response = activityService
                .getUserActivities(userPrincipal.getId(), pageable);
        ResponseData responseData = ResponseData.successWithMeta(response.getActivities(), response.getPageInfo(),
                FeedbackMessage.ACTIVITIES_RETRIEVED);
        return ResponseEntity.ok(responseData);
    }
}
