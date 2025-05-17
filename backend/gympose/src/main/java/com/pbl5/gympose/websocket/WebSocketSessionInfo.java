package com.pbl5.gympose.websocket;

import com.pbl5.gympose.entity.PoseError;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.socket.WebSocketSession;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WebSocketSessionInfo {
    WebSocketSession session;
    List<PoseError> poseErrors;
}
