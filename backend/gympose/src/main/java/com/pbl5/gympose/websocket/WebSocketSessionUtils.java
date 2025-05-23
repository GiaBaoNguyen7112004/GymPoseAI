package com.pbl5.gympose.websocket;

import com.pbl5.gympose.entity.PoseError;
import org.springframework.web.socket.WebSocketSession;

import java.util.List;
import java.util.UUID;

public class WebSocketSessionUtils {
    static final String WORKOUT_SUMMARY_ID = "workout_summary_id";
    static final String USER_ID = "user_id";
    static final String POSE_ERRORS = "pose_errors";
    static final String EXERCISE_ID = "exercise_id";
    static final String IS_CONTINUE = "is_continue";
    static final String SESSION_START_TIME = "session_start_time";

    private WebSocketSessionUtils() {
    }

    public static Object getAttribute(WebSocketSession session, String key) {
        return session.getAttributes().get(key);
    }

    public static UUID getWorkoutSummaryIdAttribute(WebSocketSession session) {
        return (UUID) getAttribute(session, WORKOUT_SUMMARY_ID);
    }

    public static UUID getUserIdAttribute(WebSocketSession session) {
        return (UUID) getAttribute(session, USER_ID);
    }

    public static List<PoseError> getPoseErrorsAttribute(WebSocketSession session) {
        return (List<PoseError>) getAttribute(session, POSE_ERRORS);
    }

    public static UUID getExerciseIdAttribute(WebSocketSession session) {
        return (UUID) getAttribute(session, EXERCISE_ID);
    }

    public static void setWorkoutSummaryIdAttribute(WebSocketSession session, Object value) {
        session.getAttributes().put(WORKOUT_SUMMARY_ID, value);
    }

    public static void setUserIdAttribute(WebSocketSession session, Object value) {
        session.getAttributes().put(USER_ID, value);
    }

    public static void setPoseErrorsAttribute(WebSocketSession session, Object value) {
        session.getAttributes().put(POSE_ERRORS, value);
    }

    public static void setExerciseIdAttribute(WebSocketSession session, Object value) {
        session.getAttributes().put(EXERCISE_ID, value);
    }

    public static void setIsContinueAttribute(WebSocketSession session, Object value) {
        session.getAttributes().put(IS_CONTINUE, value);
    }

    public static void setSessionStartTimeAttribute(WebSocketSession session, Object value) {
        session.getAttributes().put(SESSION_START_TIME, value);
    }

    public static void addPoseErrorsAttribute(WebSocketSession session, PoseError poseError) {
        List<PoseError> savedErrors = getPoseErrorsAttribute(session);
        savedErrors.add(poseError);
    }

    public static boolean getIsContinueAttribute(WebSocketSession session) {
        Object attr = getAttribute(session, IS_CONTINUE);
        return attr instanceof Boolean ? (Boolean) attr : false;
    }
}
