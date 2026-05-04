package com.todo.todo_api;

import com.todo.model.Todo;
import com.todo.repository.TodoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TodoRepositoryTest {

    @Autowired
    private TodoRepository todoRepository;

    @BeforeEach
    void setUp() {
        todoRepository.deleteAll();

        todoRepository.save(Todo.builder()
                .title("Buy groceries")
                .description("Milk, eggs, bread")
                .completed(false)
                .priority(Todo.Priority.HIGH)
                .build());

        todoRepository.save(Todo.builder()
                .title("Read a book")
                .description("Java programming")
                .completed(true)
                .priority(Todo.Priority.LOW)
                .build());
    }

    @Test
    void shouldSaveAndFindTodo() {
        List<Todo> todos = todoRepository.findAll();
        assertFalse(todos.isEmpty());
        assertEquals(2, todos.size());
    }

    @Test
    void shouldFindByCompleted() {
        List<Todo> pending = todoRepository.findByCompleted(false);
        List<Todo> done = todoRepository.findByCompleted(true);

        assertEquals(1, pending.size());
        assertEquals(1, done.size());
        assertEquals("Buy groceries", pending.get(0).getTitle());
    }

    @Test
    void shouldFindByPriority() {
        List<Todo> highPriority = todoRepository.findByPriority(Todo.Priority.HIGH);
        assertEquals(1, highPriority.size());
        assertEquals("Buy groceries", highPriority.get(0).getTitle());
    }

    @Test
    void shouldSearchByTitleIgnoreCase() {
        List<Todo> results = todoRepository.findByTitleContainingIgnoreCase("groceries");
        assertEquals(1, results.size());

        List<Todo> caseInsensitive = todoRepository.findByTitleContainingIgnoreCase("BUY");
        assertEquals(1, caseInsensitive.size());
    }

    @Test
    void shouldDeleteTodo() {
        List<Todo> todos = todoRepository.findAll();
        todoRepository.deleteById(todos.get(0).getId());

        assertEquals(1, todoRepository.findAll().size());
    }

    @Test
    void shouldReturnEmptyForUnknownId() {
        Optional<Todo> result = todoRepository.findById(999L);
        assertFalse(result.isPresent());
    }
}