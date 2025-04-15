package com.pbl5.gympose.service;

import com.pbl5.gympose.entity.Category;
import com.pbl5.gympose.payload.request.CategoryCreationRequest;
import com.pbl5.gympose.payload.request.CategoryUpdatingRequest;
import com.pbl5.gympose.payload.response.CategoryResponse;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.UUID;

public interface CategoryService {
    @PreAuthorize("hasRole('ADMIN')")
    CategoryResponse createCategory(CategoryCreationRequest categoryCreationRequest);

    @PreAuthorize("hasRole('ADMIN')")
    CategoryResponse updateCategory(UUID categoryId, CategoryUpdatingRequest categoryUpdatingRequest);

    CategoryResponse getCategoryById(UUID categoryId);

    List<CategoryResponse> getAllCategories();

    @PreAuthorize("hasRole('ADMIN')")
    void deleteCategoryById(UUID categoryId);

    Category findById(UUID categoryId);
}
