package com.todoapp.backend.controller;

import com.todoapp.backend.model.Todo;
import com.todoapp.backend.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000") // Allow React app to connect
public class TodoController {
    
    @Autowired
    private TodoRepository todoRepository;
    
    // GET /api/todos - Get all todos
    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos() {
        try {
            List<Todo> todos = todoRepository.findAllOrderByCreatedAtDesc();
            return new ResponseEntity<>(todos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // GET /api/todos/{id} - Get single todo by ID
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable("id") Long id) {
        Optional<Todo> todoData = todoRepository.findById(id);
        
        if (todoData.isPresent()) {
            return new ResponseEntity<>(todoData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    // POST /api/todos - Create new todo
    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        try {
            Todo newTodo = new Todo(todo.getTitle(), todo.getDescription());
            Todo savedTodo = todoRepository.save(newTodo);
            return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // PUT /api/todos/{id} - Update existing todo
    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable("id") Long id, @RequestBody Todo todo) {
        Optional<Todo> todoData = todoRepository.findById(id);
        
        if (todoData.isPresent()) {
            Todo existingTodo = todoData.get();
            existingTodo.setTitle(todo.getTitle());
            existingTodo.setDescription(todo.getDescription());
            existingTodo.setCompleted(todo.getCompleted());
            
            Todo updatedTodo = todoRepository.save(existingTodo);
            return new ResponseEntity<>(updatedTodo, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    // DELETE /api/todos/{id} - Delete todo
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTodo(@PathVariable("id") Long id) {
        try {
            todoRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // DELETE /api/todos - Delete all todos
    @DeleteMapping
    public ResponseEntity<HttpStatus> deleteAllTodos() {
        try {
            todoRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // GET /api/todos/completed - Get completed todos only
    @GetMapping("/completed")
    public ResponseEntity<List<Todo>> getCompletedTodos() {
        try {
            List<Todo> completedTodos = todoRepository.findByCompleted(true);
            return new ResponseEntity<>(completedTodos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // GET /api/todos/pending - Get pending todos only
    @GetMapping("/pending")
    public ResponseEntity<List<Todo>> getPendingTodos() {
        try {
            List<Todo> pendingTodos = todoRepository.findByCompleted(false);
            return new ResponseEntity<>(pendingTodos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // GET /api/todos/search?keyword=something - Search todos by title
    @GetMapping("/search")
    public ResponseEntity<List<Todo>> searchTodos(@RequestParam("keyword") String keyword) {
        try {
            List<Todo> todos = todoRepository.findByTitleContainingIgnoreCase(keyword);
            return new ResponseEntity<>(todos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}