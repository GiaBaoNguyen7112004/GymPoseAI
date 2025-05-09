package com.pbl5.gympose.event;

import com.pbl5.gympose.entity.WorkoutSummary;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WorkoutFinishEvent extends ApplicationEvent {
    WorkoutSummary workoutSummary;

    public WorkoutFinishEvent(WorkoutSummary workoutSummary) {
        super(workoutSummary);
        this.workoutSummary = workoutSummary;
    }
}
