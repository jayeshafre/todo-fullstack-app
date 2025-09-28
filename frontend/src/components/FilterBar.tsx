import React from 'react';
import { Search, Filter, List, CheckCircle, Clock, X } from 'lucide-react';

export type FilterType = 'all' | 'pending' | 'completed';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  totalCount: number;
  filteredCount: number;
  onClearSearch: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  activeFilter,
  onFilterChange,
  totalCount,
  filteredCount,
  onClearSearch
}) => {
  return (
    <div className="filter-bar">
      <div className="search-section">
        <div className="search-input-container">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="input search-input"
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button
              className="btn-icon clear-search"
              onClick={onClearSearch}
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('all')}
          >
            <List size={16} />
            All
          </button>
          <button
            className={`filter-btn ${activeFilter === 'pending' ? 'active' : ''}`}
            onClick={() => onFilterChange('pending')}
          >
            <Clock size={16} />
            Pending
          </button>
          <button
            className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => onFilterChange('completed')}
          >
            <CheckCircle size={16} />
            Completed
          </button>
        </div>
      </div>

      {(searchTerm || activeFilter !== 'all') && (
        <div className="filter-results">
          <span className="results-text">
            Showing {filteredCount} of {totalCount} todos
          </span>
        </div>
      )}
    </div>
  );
};

export default FilterBar;