package com.todo.todo_api;

import com.todo.todo_api.dto.TodoRequest;
import com.todo.todo_api.dto.TodoResponse;
import com.todo.todo_api.exception.ResourceNotFoundException;
import com.todo.todo_api.model.Todo;
import com.todo.todo_api.repository.TodoRepository;
import com.todo.todo_api.service.TodoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository;

    @InjectMocks
    private TodoService todoService;

    private Todo todo;
    private TodoRequest request;

    @BeforeEach
    void setUp() {
        todo = Todo.builder()
                .id(1L)
                .title("Test Todo")
                .description("Test Description")
                .completed(false)
                .priority(Todo.Priority.MEDIUM)
                .build();

        request = new TodoRequest();
        request.setTitle("Test Todo");
        request.setDescription("Test Description");
        request.setCompleted(false);
        request.setPriority(Todo.Priority.MEDIUM);
    }

    @Test
    void createTodo_ShouldReturnTodoResponse() {
        when(todoRepository.save(any(Todo.class))).thenReturn(todo);

        TodoResponse response = todoService.createTodo(request);

        assertNotNull(response);
        assertEquals("Test Todo", response.getTitle());
        assertEquals(Todo.Priority.MEDIUM, response.getPriority());
        verify(todoRepository, times(1)).save(any(Todo.class));
    }

    @Test
    void getAllTodos_ShouldReturnList() {
        when(todoRepository.findAll()).thenReturn(List.of(todo));

        List<TodoResponse> responses = todoService.getAllTodos();

        assertNotNull(responses);
        assertEquals(1, responses.size());
        assertEquals("Test Todo", responses.get(0).getTitle());
    }

    @Test
    void getTodoById_ShouldReturnTodo_WhenExists() {
        when(todoRepository.findById(1L)).thenReturn(Optional.of(todo));

        TodoResponse response = todoService.getTodoById(1L);

        assertNotNull(response);
        assertEquals(1L, response.getId());
    }

    @Test
    void getTodoById_ShouldThrowException_WhenNotFound() {
        when(todoRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> todoService.getTodoById(99L));
    }

    @Test
    void deleteTodo_ShouldDelete_WhenExists() {
        when(todoRepository.findById(1L)).thenReturn(Optional.of(todo));

        todoService.deleteTodo(1L);

        verify(todoRepository, times(1)).deleteById(1L);
    }

    @Test
    void deleteTodo_ShouldThrowException_WhenNotFound() {
        when(todoRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> todoService.deleteTodo(99L));
    }
}