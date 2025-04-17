package com.pbl5.gympose.mapper;

import com.pbl5.gympose.entity.Step;
import com.pbl5.gympose.payload.request.exercise.StepCreationRequest;
import com.pbl5.gympose.payload.response.exercise.StepRespone;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface StepMapper {
    StepRespone toStepRespone(Step step);

    Step toStep(StepCreationRequest stepCreationRequest);
}
