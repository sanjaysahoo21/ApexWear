package com.sanju.apexwear.category.service;

import com.sanju.apexwear.category.dto.CategoryRequest;
import com.sanju.apexwear.category.dto.CategoryResponse;
import com.sanju.apexwear.category.model.Category;
import com.sanju.apexwear.category.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public CategoryResponse createCategory(CategoryRequest request) {
        Category category = new Category();
        category.setName(request.getName());
        category.setDescription(request.getDescription());

        if (request.getParentId() != null) {
            Category parent = categoryRepository.findById(request.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent category not found"));
            category.setParent(parent);
        }

        Category savedCategory = categoryRepository.save(category);
        return mapToResponse(savedCategory);
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllCategories() {
        // Fetch only root categories, children will be fetched recursively
        List<Category> roots = categoryRepository.findByParentIsNullAndIsActiveTrue();
        return roots.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setUpdatedAt(LocalDateTime.now());

        if (request.getParentId() != null) {
            // Prevent circular reference (A -> B -> A)
            if (request.getParentId().equals(id)) {
                throw new RuntimeException("Category cannot be its own parent");
            }
            Category parent = categoryRepository.findById(request.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent category not found"));
            category.setParent(parent);
        } else {
            category.setParent(null); // Make it a root category
        }

        Category updatedCategory = categoryRepository.save(category);
        return mapToResponse(updatedCategory);
    }

    @Transactional
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        categoryRepository.delete(category);
    }

    private CategoryResponse mapToResponse(Category category) {
        List<CategoryResponse> children = category.getChildren().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getDescription(),
                children
        );
    }
}
