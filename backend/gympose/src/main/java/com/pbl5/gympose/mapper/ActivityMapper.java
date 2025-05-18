package com.pbl5.gympose.mapper;

import com.pbl5.gympose.entity.Activity;
import com.pbl5.gympose.payload.response.activity.ActivityResponse;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ActivityMapper {
    List<ActivityResponse> toActivityResponses(List<Activity> activities);

    ActivityResponse toActivityResponse(Activity activity);
}
