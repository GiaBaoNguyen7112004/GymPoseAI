package com.pbl5.gympose.mapper;


import com.pbl5.gympose.entity.Target;
import com.pbl5.gympose.payload.request.target.TargetRequest;
import com.pbl5.gympose.payload.response.target.TargetCaloriesResponse;
import com.pbl5.gympose.payload.response.target.TargetResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface TargetMapper {
    TargetCaloriesResponse toTargetCaloriesResponse(Target target);

    TargetResponse toTargetResponse(Target target);

    void updateTarget(@MappingTarget Target target, TargetRequest request);
}
