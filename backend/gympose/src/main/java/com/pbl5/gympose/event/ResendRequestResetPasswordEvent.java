package com.pbl5.gympose.event;

import com.pbl5.gympose.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ResendRequestResetPasswordEvent extends ApplicationEvent {
    User user;

    public ResendRequestResetPasswordEvent(User user) {
        super(user);
        this.user = user;
    }
}