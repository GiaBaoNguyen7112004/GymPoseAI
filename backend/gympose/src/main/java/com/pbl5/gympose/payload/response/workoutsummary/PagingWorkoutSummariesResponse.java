package com.pbl5.gympose.payload.response.workoutsummary;


import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.pbl5.gympose.payload.general.PageInfo;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class PagingWorkoutSummariesResponse {
    PageInfo pageInfo;
    List<WorkoutSummaryDetailResponse> workoutSummaries;
}
