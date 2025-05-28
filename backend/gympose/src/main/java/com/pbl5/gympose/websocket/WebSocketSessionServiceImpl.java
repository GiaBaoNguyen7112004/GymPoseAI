package com.pbl5.gympose.websocket;

import com.pbl5.gympose.entity.PoseError;
import com.pbl5.gympose.payload.request.workoutsummary.PoseErrorImageRequest;
import com.pbl5.gympose.utils.CommonFunction;
import com.pbl5.gympose.utils.LogUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WebSocketSessionServiceImpl implements WebSocketSessionService {
    WebSocketSessionStorage sessionStorage;

    @Override
    public WebSocketSession getSession(final String sessionId) {
        return sessionStorage.getSession(sessionId);
    }

    @Override
    public void sendMessageAfterConnection(final WebSocketSession session, final UUID workoutSummaryId) throws IOException {
        final String WORKOUT_SUMMARY_ID = "workout_summary_id";
        final String SESSION_ID = "session_id";

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put(WORKOUT_SUMMARY_ID, workoutSummaryId);
        responseMap.put(SESSION_ID, session.getId());

        try {
            session.sendMessage(new TextMessage(CommonFunction.toJsonString(responseMap)));
        } catch (IOException ioException) {
            throw new IOException("Failed to send message after connection", ioException);
        }
    }

    @Override
    public void initSession(final WebSocketSession session, final UUID userId, final UUID workoutSummaryId,
                            final UUID exerciseId) {
        List<String> poseErrors = new ArrayList<>();
        WebSocketSessionUtils.setPoseErrorsAttribute(session, poseErrors);
        WebSocketSessionUtils.setWorkoutSummaryIdAttribute(session, workoutSummaryId);
        WebSocketSessionUtils.setSessionStartTimeAttribute(session, LocalDateTime.now());
        WebSocketSessionUtils.setExerciseIdAttribute(session, exerciseId);
        WebSocketSessionUtils.setUserIdAttribute(session, userId);
        sessionStorage.addWebSocketSession(session.getId(), session);
    }

    @Override
    public void addSessionPoseError(final String sessionId, PoseError poseError) {
        try {
            WebSocketSession session = getSession(sessionId);
            WebSocketSessionUtils.addPoseErrorsAttribute(session, poseError);
        } catch (Exception e) {
            LogUtils.error("ERROR - add Session pose error failed " + e.getMessage());
            Throwable cause = e.getCause();
            if (cause != null) {
                cause.printStackTrace();
            }
        }
    }

    @Override
    public void sendMessage(WebSocketSession session, TextMessage textMessage) throws IOException {
        try {
            session.sendMessage(textMessage);
        } catch (IOException ioException) {
            throw new IOException("ERROR - Failed to send message", ioException);
        }
    }

    @Override
    public void sendMessageResultToClient(final String sessionId, String message) throws IOException {
        WebSocketSession session = getSession(sessionId);
        try {
            synchronized (session) {
                session.sendMessage(new TextMessage(message));
            }
        } catch (IOException e) {
            throw new IOException("ERROR - Failed to send message result to client", e);
        }
    }

    @Override
    public void removeSession(final String sessionId) {
        sessionStorage.removeWebSocketSession(sessionId);
    }

    @Override
    public void addImageUrlsToPoseErrors(String sessionId, List<PoseErrorImageRequest> poseErrorsImages) {
        poseErrorsImages.forEach(poseErrorImageRequest -> {
            LogUtils.info("REQUEST - " + poseErrorImageRequest.getUrl());
            LogUtils.info("REQUEST - " + poseErrorImageRequest.getRepIndex());
        });

        LogUtils.info("INFO - ADD IMAGES TO URL");
        List<PoseError> poseErrors = WebSocketSessionUtils.getPoseErrorsAttribute(getSession(sessionId));
        LogUtils.info("INFO - ADD IMAGES : SIZE POSE ERRROS" + poseErrors.size());
        poseErrors.forEach(poseError -> {
            String repIndex = String.valueOf(poseError.getRepIndex());
            LogUtils.info("INFO - ADD IMAGES: " + repIndex);
            LogUtils.info("INFO - ADD IMAGES" + poseError.getImageUrl());
            LogUtils.info("INFO - ADD IMAGES" + poseError.getId());
            LogUtils.info("INFO - ADD IMAGES" + poseError.getAiResult());

            poseErrorsImages.stream()
                    .filter(imageReq -> repIndex.equals(imageReq.getRepIndex()))
                    .findFirst()
                    .ifPresent(imageReq -> poseError.setImageUrl(imageReq.getUrl()));
        });
    }

}
