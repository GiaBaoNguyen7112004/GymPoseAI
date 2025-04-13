package com.pbl5.gympose.controller;

import com.pbl5.gympose.payload.general.ResponseData;
import com.pbl5.gympose.payload.request.CategoryCreationRequest;
import com.pbl5.gympose.payload.request.CategoryUpdatingRequest;
import com.pbl5.gympose.service.CategoryService;
import com.pbl5.gympose.utils.FeedbackMessage;
import com.pbl5.gympose.utils.UrlMapping;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(UrlMapping.CATEGORIES)
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController {
    CategoryService categoryService;

    @PostMapping(UrlMapping.CATEGORY_CREATE)
    public ResponseEntity<ResponseData> createCategory(@Valid @RequestBody CategoryCreationRequest categoryCreationRequest) {
        ResponseData responseData = ResponseData.success(categoryService.createCategory(categoryCreationRequest),
                FeedbackMessage.CATEGORY_CREATE_SUCCESS);
        return ResponseEntity.ok(responseData);
    }

    @GetMapping(UrlMapping.CATEGORY_GET_ALL)
    public ResponseEntity<ResponseData> getAllCategories() {
        ResponseData responseData = ResponseData.success(categoryService.getAllCategories(),
                FeedbackMessage.CATEGORY_GET_ALL_SUCCESS);
        return ResponseEntity.ok(responseData);
    }

    @PatchMapping(UrlMapping.CATEGORY_UPDATE)
    public ResponseEntity<ResponseData> updateCategory(@PathVariable(name = "category-id") UUID categoryId,
                                                       @Valid @RequestBody CategoryUpdatingRequest categoryUpdatingRequest) {
        ResponseData responseData = ResponseData.success(categoryService.updateCategory(categoryId, categoryUpdatingRequest),
                FeedbackMessage.CATEGORY_UPDATE_SUCCESS);
        return ResponseEntity.ok(responseData);
    }

    @GetMapping(UrlMapping.CATEGORY_GET_BY_ID)
    public ResponseEntity<ResponseData> getCategoryById(@PathVariable(name = "category-id") UUID categoryId) {
        ResponseData responseData = ResponseData.success(categoryService.getCategoryById(categoryId),
                FeedbackMessage.CATEGORY_GET_SUCCESS);
        return ResponseEntity.ok(responseData);
    }

    @DeleteMapping(UrlMapping.CATEGORY_DELETE_BY_ID)
    public ResponseEntity<ResponseData> deleteCategory(@PathVariable(name = "category-id") UUID categoryId) {
        categoryService.deleteCategoryById(categoryId);
        ResponseData responseData = ResponseData.successWithoutMetaAndData(FeedbackMessage.CATEGORY_DELETE_SUCCESS);
        return ResponseEntity.ok(responseData);
    }

}
