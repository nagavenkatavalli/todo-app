package com.todo.todo_api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.todo.todo_api.dto.TodoRequest;
import com.todo.todo_api.dto.TodoResponse;
import com.todo.todo_api.exception.ResourceNotFoundException;
import com.todo.todo_api.model.Todo;
import com.todo.todo_api.service.TodoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class TodoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private TodoService todoService;

    private ObjectMapper objectMapper = new ObjectMapper();

    private TodoResponse todoResponse;
    private TodoRequest todoRequest;

    @BeforeEach
    void setUp() {
        todoResponse = TodoResponse.builder()
                .id(1L)
                .title("Test Todo")
                .description("Test Description")
                .completed(false)
                .priority(Todo.Priority.MEDIUM)
                .build();

        todoRequest = new TodoRequest();
        todoRequest.setTitle("Test Todo");
        todoRequest.setDescription("Test Description");
        todoRequest.setCompleted(false);
        todoRequest.setPriority(Todo.Priority.MEDIUM);
    }

    @Test
    void createTodo_ShouldReturn201() throws Exception {
        when(todoService.createTodo(any(TodoRequest.class))).thenReturn(todoResponse);

        mockMvc.perform(post("/api/todos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(todoRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Test Todo"))
                .andExpect(jsonPath("$.priority").value("MEDIUM"));
    }

    @Test
    void getAllTodos_ShouldReturn200() throws Exception {
        when(todoService.getAllTodos()).thenReturn(List.of(todoResponse));

        mockMvc.perform(get("/api/todos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].title").value("Test Todo"));
    }

    @Test
    void getTodoById_ShouldReturn200_WhenExists() throws Exception {
        when(todoService.getTodoById(1L)).thenReturn(todoResponse);

        mockMvc.perform(get("/api/todos/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void getTodoById_ShouldReturn404_WhenNotFound() throws Exception {
        when(todoService.getTodoById(99L))
                .thenThrow(new ResourceNotFoundException("Todo not found with id: 99"));

        mockMvc.perform(get("/api/todos/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Todo not found with id: 99"));
    }

    @Test
    void deleteTodo_ShouldReturn204() throws Exception {
        mockMvc.perform(delete("/api/todos/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void deleteTodo_ShouldReturn404_WhenNotFound() throws Exception {
        doThrow(new ResourceNotFoundException("Todo not found with id: 99"))
                .when(todoService).deleteTodo(99L);

        mockMvc.perform(delete("/api/todos/99"))
                .andExpect(status().isNotFound());
    }
}