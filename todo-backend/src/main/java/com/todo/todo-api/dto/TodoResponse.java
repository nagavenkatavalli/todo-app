package com.todo.todo_api.dto;

import com.todo.todo_api.model.Todo;
import lombok.Data;
import lombok.Builder;

import java.time.LocalDateTime;

@Data
@Builder
public class TodoResponse {

    private Long id;

    private String title;

    private String description;

    private boolean completed;

    private Todo.Priority priority;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}