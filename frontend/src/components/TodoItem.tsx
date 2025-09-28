import React, { useState } from 'react';
import { Check, Edit2, Trash2, Clock, Calendar } from 'lucide-react';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onEdit,
  onDelete
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setIsDeleting(true);
      await onDelete(todo.id);
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : 'pending'}`}>
      <div className="todo-content">
        <button
          className={`complete-btn ${todo.completed ? 'completed' : ''}`}
          onClick={() => onToggleComplete(todo.id)}
          title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <Check size={16} />
        </button>

        <div className="todo-text">
          <h3 className={`todo-title ${todo.completed ? 'completed-text' : ''}`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className={`todo-description ${todo.completed ? 'completed-text' : ''}`}>
              {todo.description}
            </p>
          )}
          <div className="todo-meta">
            <span className="todo-date">
              <Calendar size={14} />
              Created: {formatDate(todo.createdAt)}
            </span>
            {todo.updatedAt !== todo.createdAt && (
              <span className="todo-date updated">
                <Clock size={14} />
                Updated: {formatDate(todo.updatedAt)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="todo-actions">
        <button
          className="btn-icon edit-btn"
          onClick={() => onEdit(todo)}
          title="Edit todo"
          disabled={isDeleting}
        >
          <Edit2 size={16} />
        </button>
        <button
          className="btn-icon delete-btn"
          onClick={handleDelete}
          title="Delete todo"
          disabled={isDeleting}
        >
          {isDeleting ? (
            <div className="spinner small"></div>
          ) : (
            <Trash2 size={16} />
          )}
        </button>
      </div>
    </div>
  );
};

export default TodoItem;