package com.pbl5.gympose.mapper;

import com.pbl5.gympose.entity.PoseError;
import com.pbl5.gympose.payload.request.workoutsummary.PoseErrorCreationRequest;
import com.pbl5.gympose.payload.response.workoutsummary.PoseErrorResponse;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface PoseErrorMapper {
    List<PoseError> toPoseErrors(List<PoseErrorCreationRequest> requests);

    PoseError toPoseError(PoseErrorCreationRequest request);

    List<PoseErrorResponse> toPoseErrorResponses(List<PoseError> requests);
}
