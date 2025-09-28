import React from 'react';
import { Plus, CheckCircle, Clock, List } from 'lucide-react';

interface HeaderProps {
  totalTodos: number;
  completedTodos: number;
  onAddClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ totalTodos, completedTodos, onAddClick }) => {
  const pendingTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>
            <List className="header-icon" />
            My Todo List
          </h1>
          <p className="header-subtitle">
            Stay organized and get things done!
          </p>
        </div>

        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-icon total">
              <List size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-number">{totalTodos}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon completed">
              <CheckCircle size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-number">{completedTodos}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pending">
              <Clock size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-number">{pendingTodos}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>

          {totalTodos > 0 && (
            <div className="completion-rate">
              <div className="completion-circle">
                <span>{completionRate}%</span>
              </div>
              <span className="completion-label">Complete</span>
            </div>
          )}
        </div>

        <button className="btn btn-primary add-btn" onClick={onAddClick}>
          <Plus size={20} />
          Add New Todo
        </button>
      </div>
    </header>
  );
};

export default Header;