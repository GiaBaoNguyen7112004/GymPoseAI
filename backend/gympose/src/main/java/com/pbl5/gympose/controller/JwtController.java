package com.pbl5.gympose.controller;

import com.pbl5.gympose.payload.general.ResponseData;
import com.pbl5.gympose.payload.request.jwt.RefreshTokenRequest;
import com.pbl5.gympose.service.jwt.JwtService;
import com.pbl5.gympose.utils.ApiPath;
import com.pbl5.gympose.utils.FeedbackMessage;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ApiPath.JWT)
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "JWT API", description = "JWT management")
public class JwtController {
    JwtService jwtService;

    @PostMapping(ApiPath.JWT_REFRESH)
    public ResponseEntity<ResponseData> refreshJwt(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        ResponseData responseData = ResponseData.success(jwtService.refreshToken(refreshTokenRequest.getRefreshToken()),
                FeedbackMessage.JWT_REFRESHED);
        return ResponseEntity.ok(responseData);
    }
}
