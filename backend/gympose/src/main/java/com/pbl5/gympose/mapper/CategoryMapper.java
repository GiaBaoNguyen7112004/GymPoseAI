package com.pbl5.gympose.mapper;

import com.pbl5.gympose.entity.Category;
import com.pbl5.gympose.entity.Exercise;
import com.pbl5.gympose.payload.request.category.CategoryUpdatingRequest;
import com.pbl5.gympose.payload.response.category.CategoryResponse;
import com.pbl5.gympose.utils.WorkoutUtils;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface CategoryMapper {
    CategoryResponse toCategoryResponse(Category category);

    void updateCategory(CategoryUpdatingRequest categoryUpdatingRequest, @MappingTarget Category category);

    List<CategoryResponse> toCategoryResponses(List<Category> categories);

    @AfterMapping
    default void afterToCategoryResponse(Category category, @MappingTarget CategoryResponse response) {
        if (category.getExercises() != null) {
            List<Exercise> exercises = category.getExercises();
            response.setExerciseCount(exercises.size());
            response.setDurationMinutes(exercises.stream().mapToInt(Exercise::getDurationMinutes).sum());
            response.setCaloriesBurned(exercises.stream()
                    .mapToDouble(exercise -> WorkoutUtils.getCaloriesBase(null, exercise)).sum());
        }
    }
}
