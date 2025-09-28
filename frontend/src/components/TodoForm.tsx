import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/Todo';

interface TodoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (todo: CreateTodoRequest | UpdateTodoRequest) => void;
  editingTodo?: Todo | null;
  isSubmitting: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingTodo,
  isSubmitting
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  // Reset form when modal opens/closes or editing todo changes
  useEffect(() => {
    if (isOpen) {
      if (editingTodo) {
        setTitle(editingTodo.title);
        setDescription(editingTodo.description);
        setCompleted(editingTodo.completed);
      } else {
        setTitle('');
        setDescription('');
        setCompleted(false);
      }
    }
  }, [isOpen, editingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (editingTodo) {
      // Update existing todo
      const updateData: UpdateTodoRequest = {
        title: title.trim(),
        description: description.trim(),
        completed
      };
      onSubmit(updateData);
    } else {
      // Create new todo
      const createData: CreateTodoRequest = {
        title: title.trim(),
        description: description.trim()
      };
      onSubmit(createData);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {editingTodo ? 'Edit Todo' : 'Add New Todo'}
          </h2>
          <button 
            className="btn-icon" 
            onClick={handleClose}
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="todo-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              type="text"
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter todo title..."
              required
              disabled={isSubmitting}
              maxLength={255}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="input textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description (optional)..."
              rows={4}
              disabled={isSubmitting}
              maxLength={1000}
            />
          </div>

          {editingTodo && (
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                  disabled={isSubmitting}
                />
                <span className="checkmark"></span>
                Mark as completed
              </label>
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || !title.trim()}
            >
              {isSubmitting ? (
                <div className="spinner"></div>
              ) : editingTodo ? (
                <>
                  <Save size={16} />
                  Update Todo
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Add Todo
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;