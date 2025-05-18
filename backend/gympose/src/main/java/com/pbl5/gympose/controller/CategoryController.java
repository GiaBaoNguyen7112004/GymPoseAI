package com.pbl5.gympose.controller;

import com.pbl5.gympose.payload.general.ResponseData;
import com.pbl5.gympose.payload.request.category.CategoryCreationRequest;
import com.pbl5.gympose.payload.request.category.CategoryUpdatingRequest;
import com.pbl5.gympose.service.CategoryService;
import com.pbl5.gympose.utils.ApiPath;
import com.pbl5.gympose.utils.FeedbackMessage;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(ApiPath.CATEGORIES)
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Tag(name = "Category API", description = "Category management")
public class CategoryController {
    CategoryService categoryService;

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "create category")
    @PostMapping
    public ResponseEntity<ResponseData> createCategory(@Valid @RequestBody CategoryCreationRequest categoryCreationRequest) {
        ResponseData responseData = ResponseData.success(categoryService.createCategory(categoryCreationRequest),
                FeedbackMessage.CATEGORY_CREATED);
        return ResponseEntity.ok(responseData);
    }

    @Operation(summary = "get all categories")
    @GetMapping
    public ResponseEntity<ResponseData> getAllCategories() {
        ResponseData responseData = ResponseData.success(categoryService.getAllCategories(),
                FeedbackMessage.CATEGORIES_RETRIEVED);
        return ResponseEntity.ok(responseData);
    }

    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "update categories")
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping(ApiPath.CATEGORY_BY_ID)
    public ResponseEntity<ResponseData> updateCategory(@PathVariable(name = "category-id") UUID categoryId,
                                                       @Valid @RequestBody CategoryUpdatingRequest categoryUpdatingRequest) {
        ResponseData responseData = ResponseData.success(categoryService.updateCategory(categoryId, categoryUpdatingRequest),
                FeedbackMessage.CATEGORY_UPDATED);
        return ResponseEntity.ok(responseData);
    }

    @GetMapping(ApiPath.CATEGORY_BY_ID)
    @Operation(summary = "get category by id")
    public ResponseEntity<ResponseData> getCategoryById(@PathVariable(name = "category-id") UUID categoryId) {
        ResponseData responseData = ResponseData.success(categoryService.getCategoryById(categoryId),
                FeedbackMessage.CATEGORY_RETRIEVED);
        return ResponseEntity.ok(responseData);
    }

    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "delete category by id")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(ApiPath.CATEGORY_BY_ID)
    public ResponseEntity<ResponseData> deleteCategory(@PathVariable(name = "category-id") UUID categoryId) {
        categoryService.deleteCategoryById(categoryId);
        ResponseData responseData = ResponseData.successWithoutMetaAndData(FeedbackMessage.CATEGORY_DELETED);
        return ResponseEntity.ok(responseData);
    }

}
