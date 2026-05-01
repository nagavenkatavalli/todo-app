package com.todo.todo_api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import com.todo.todo_api.model.Todo;

@Data
public class TodoRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private boolean completed;

    private Todo.Priority priority = Todo.Priority.MEDIUM;
}