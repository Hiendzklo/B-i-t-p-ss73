import React, { useState } from 'react';
import axios from 'axios';
import EditTaskModal from './EditTaskModal';
import '../CSS/TaskItem.css';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  tasks: Task[];
  onTaskUpdate: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, tasks, onTaskUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggle = () => {
    axios.patch(`http://localhost:8080/tasks/${task.id}`, { completed: !task.completed })
      .then(response => onTaskUpdate());
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/tasks/${task.id}`)
      .then(response => onTaskUpdate());
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="task-item">
      <input type="checkbox" checked={task.completed} onChange={handleToggle} />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.title}
      </span>
      <button className="edit-button" onClick={handleEdit}>Sửa</button>
      <button className="delete-button" onClick={handleDelete}>Xóa</button>
      <EditTaskModal 
        isOpen={isModalOpen} 
        onRequestClose={() => setIsModalOpen(false)} 
        task={task} 
        tasks={tasks} 
        onTaskUpdate={onTaskUpdate} 
      />
    </div>
  );
};

export default TaskItem;