package com.sanju.apexwear.category.dto;

import java.util.List;

public class CategoryResponse {
    private Long id;
    private String name;
    private String description;
    private List<CategoryResponse> children;

    public CategoryResponse(Long id, String name, String description, List<CategoryResponse> children) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.children = children;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<CategoryResponse> getChildren() {
        return children;
    }

    public void setChildren(List<CategoryResponse> children) {
        this.children = children;
    }
}
