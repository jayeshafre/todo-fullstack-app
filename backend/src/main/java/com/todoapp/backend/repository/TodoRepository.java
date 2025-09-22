package com.todoapp.backend.repository;

import com.todoapp.backend.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    
    // Find all todos ordered by creation date (newest first)
    @Query("SELECT t FROM Todo t ORDER BY t.createdAt DESC")
    List<Todo> findAllOrderByCreatedAtDesc();
    
    // Find todos by completion status
    List<Todo> findByCompleted(Boolean completed);
    
    // Find todos by title containing keyword (case insensitive)
    List<Todo> findByTitleContainingIgnoreCase(String keyword);
    
    // Custom query to count completed todos
    @Query("SELECT COUNT(t) FROM Todo t WHERE t.completed = true")
    Long countCompletedTodos();
    
    // Custom query to count pending todos
    @Query("SELECT COUNT(t) FROM Todo t WHERE t.completed = false")
    Long countPendingTodos();
}