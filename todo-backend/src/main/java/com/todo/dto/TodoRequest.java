package com.todo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import com.todo.model.Todo;

@Data
public class TodoRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private boolean completed;

    private Todo.Priority priority = Todo.Priority.MEDIUM;
}