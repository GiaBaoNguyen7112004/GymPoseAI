package com.pbl5.gympose.service.impl;

import com.pbl5.gympose.entity.Category;
import com.pbl5.gympose.exception.NotFoundException;
import com.pbl5.gympose.mapper.CategoryMapper;
import com.pbl5.gympose.payload.request.category.CategoryCreationRequest;
import com.pbl5.gympose.payload.request.category.CategoryUpdatingRequest;
import com.pbl5.gympose.payload.response.category.CategoryResponse;
import com.pbl5.gympose.repository.CategoryRepository;
import com.pbl5.gympose.service.CategoryService;
import com.pbl5.gympose.utils.exception.ErrorMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryServiceImpl implements CategoryService {
    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    @Override
    public CategoryResponse createCategory(CategoryCreationRequest categoryCreationRequest) {
        return categoryMapper
                .toCategoryResponse(categoryRepository.save(Category.builder()
                        .name(categoryCreationRequest.getName()).build()));
    }

    @Override
    public CategoryResponse updateCategory(UUID categoryId, CategoryUpdatingRequest categoryUpdatingRequest) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.CATEGORY_NOT_FOUND));
        categoryMapper.updateCategory(categoryUpdatingRequest, category);
        return categoryMapper.toCategoryResponse(categoryRepository.save(category));
    }

    @Override
    public CategoryResponse getCategoryById(UUID categoryId) {
        return categoryMapper.toCategoryResponse(categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.CATEGORY_NOT_FOUND)));
    }

    @Override
    public List<CategoryResponse> getAllCategories() {
        return categoryMapper.toCategoryResponses(categoryRepository.findAll());
    }

    @Override
    public void deleteCategoryById(UUID categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    @Override
    public Category findById(UUID categoryId) {
        return categoryRepository.findById(categoryId).orElseThrow(()
                -> new NotFoundException(ErrorMessage.CATEGORY_NOT_FOUND));
    }
}
