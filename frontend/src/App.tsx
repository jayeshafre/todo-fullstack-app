import React, { useState, useEffect, useMemo } from 'react';
import { TodoService } from './services/api';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from './types/Todo';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import FilterBar, { FilterType } from './components/FilterBar';
import TodoList from './components/TodoList';
import './components/components.css';


// Toast notification component
const Toast: React.FC<{ message: string; type: 'success' | 'error'; onClose: () => void }> = ({ 
  message, type, onClose 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
};

function App() {
  // State management
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);


// Show toast notification
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  // Load todos on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  // Load all todos from backend
  const loadTodos = async () => {
    try {
      setIsLoading(true);
      const todosData = await TodoService.getAllTodos();
      setTodos(todosData);
    } catch (error) {
      console.error('Error loading todos:', error);
      showToast('Failed to load todos', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and search todos
  const filteredTodos = useMemo(() => {
    let filtered = todos;

    // Apply status filter
    if (activeFilter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    } else if (activeFilter === 'pending') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [todos, activeFilter, searchTerm]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    return { total, completed };
  }, [todos]);

  // Handle form submission (create or update)
  const handleFormSubmit = async (formData: CreateTodoRequest | UpdateTodoRequest) => {
    try {
      setIsSubmitting(true);

      if (editingTodo) {
        // Update existing todo
        const updatedTodo = await TodoService.updateTodo(editingTodo.id, formData as UpdateTodoRequest);
        setTodos(prev => prev.map(todo => 
          todo.id === editingTodo.id ? updatedTodo : todo
        ));
        showToast('Todo updated successfully!', 'success');
      } else {
        // Create new todo
        const newTodo = await TodoService.createTodo(formData as CreateTodoRequest);
        setTodos(prev => [newTodo, ...prev]);
        showToast('Todo created successfully!', 'success');
      }

      // Close form and reset
      setIsFormOpen(false);
      setEditingTodo(null);
    } catch (error) {
      console.error('Error saving todo:', error);
      showToast('Failed to save todo', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle toggle complete status
  const handleToggleComplete = async (id: number) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const updateData: UpdateTodoRequest = {
        title: todo.title,
        description: todo.description,
        completed: !todo.completed
      };

      const updatedTodo = await TodoService.updateTodo(id, updateData);
      setTodos(prev => prev.map(t => t.id === id ? updatedTodo : t));
      
      showToast(
        `Todo marked as ${updatedTodo.completed ? 'completed' : 'pending'}!`, 
        'success'
      );
    } catch (error) {
      console.error('Error toggling todo:', error);
      showToast('Failed to update todo', 'error');
    }
  };

  // Handle edit todo
  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  // Handle delete todo
  const handleDeleteTodo = async (id: number) => {
    try {
      await TodoService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      showToast('Todo deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting todo:', error);
      showToast('Failed to delete todo', 'error');
    }
  };

  // Handle opening add form
  const handleAddClick = () => {
    setEditingTodo(null);
    setIsFormOpen(true);
  };

  // Handle closing form
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTodo(null);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="app">
      <Header
        totalTodos={stats.total}
        completedTodos={stats.completed}
        onAddClick={handleAddClick}
      />

      <div className="container">
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          totalCount={todos.length}
          filteredCount={filteredTodos.length}
          onClearSearch={handleClearSearch}
        />

        <TodoList
          todos={filteredTodos}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
          isLoading={isLoading}
          searchTerm={searchTerm}
          activeFilter={activeFilter}
        />
      </div>

      <TodoForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        editingTodo={editingTodo}
        isSubmitting={isSubmitting}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;