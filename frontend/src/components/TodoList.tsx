import React from 'react';
import { CheckCircle, Clock, Search } from 'lucide-react';
import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';
import { FilterType } from './FilterBar';

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
  searchTerm: string;
  activeFilter: FilterType;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleComplete,
  onEdit,
  onDelete,
  isLoading,
  searchTerm,
  activeFilter
}) => {
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner large"></div>
        <p>Loading todos...</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        {searchTerm || activeFilter !== 'all' ? (
          <div className="no-results">
            <Search size={48} />
            <h3>No todos found</h3>
            <p>
              {searchTerm 
                ? `No todos match "${searchTerm}"`
                : `No ${activeFilter} todos found`
              }
            </p>
          </div>
        ) : (
          <div className="no-todos">
            <CheckCircle size={64} />
            <h3>No todos yet!</h3>
            <p>Create your first todo to get started</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="todo-list">
      <div className="todo-grid">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;