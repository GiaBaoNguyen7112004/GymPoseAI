package com.pbl5.gympose.controller;

import com.pbl5.gympose.entity.UserPrincipal;
import com.pbl5.gympose.payload.general.ResponseData;
import com.pbl5.gympose.payload.request.user.UserUpdatingRequest;
import com.pbl5.gympose.security.annotation.CurrentUser;
import com.pbl5.gympose.service.UserService;
import com.pbl5.gympose.utils.ApiPath;
import com.pbl5.gympose.utils.FeedbackMessage;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping(ApiPath.USERS)
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "User API", description = "User management")
public class UserController {
    UserService userService;

    @SecurityRequirement(name = "bearerAuth")
    @GetMapping(ApiPath.USER_PROFILE)
    public ResponseEntity<ResponseData> getProfile(@CurrentUser UserPrincipal currentUser) {
        ResponseData responseData = ResponseData.success(userService.getProfile(currentUser.getId()),
                FeedbackMessage.USER_PROFILE_RETRIEVED);
        return ResponseEntity.ok(responseData);
    }

    @GetMapping
    public ResponseEntity<ResponseData> getUsers() {
        ResponseData responseData = ResponseData.success(userService.getUsers(),
                FeedbackMessage.USERS_RETRIEVED);
        return ResponseEntity.ok(responseData);
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(ApiPath.USER_BY_ID)
    public ResponseEntity<ResponseData> deleteUser(@PathVariable(name = "user-id") UUID userId) {
        userService.deleteUser(userId);
        ResponseData responseData = ResponseData.successWithoutMetaAndData(FeedbackMessage.USER_DELETED);
        return ResponseEntity.ok(responseData);
    }

    @SecurityRequirement(name = "bearerAuth")
    @PostMapping(ApiPath.UPLOAD_IMAGE)
    public ResponseEntity<ResponseData> uploadAvatar(@RequestParam MultipartFile file) {
        ResponseData responseData = ResponseData.success(userService.uploadAvatar(file), FeedbackMessage.IMAGE_UPLOADED);
        return ResponseEntity.ok(responseData);
    }

    @SecurityRequirement(name = "bearerAuth")
    @PatchMapping
    public ResponseEntity<ResponseData> updateUser(@CurrentUser UserPrincipal currentUser,
                                                   @RequestBody UserUpdatingRequest request) {
        userService.updateUser(currentUser.getId(), request);
        ResponseData responseData = ResponseData.successWithoutMetaAndData(FeedbackMessage.USER_UPDATED);
        return ResponseEntity.ok(responseData);
    }
}
