import React from 'react';
import '../CSS/FilterTasks.css'

interface FilterTasksProps {
  onFilterChange: (filter: string) => void;
}

const FilterTasks: React.FC<FilterTasksProps> = ({ onFilterChange }) => {
  return (
    <div className="filter-buttons">
      <button onClick={() => onFilterChange('all')}>Tất cả</button>
      <button onClick={() => onFilterChange('completed')}>Hoàn thành</button>
      <button onClick={() => onFilterChange('active')}>Đang thực hiện</button>
    </div>
  );
};

export default FilterTasks;
