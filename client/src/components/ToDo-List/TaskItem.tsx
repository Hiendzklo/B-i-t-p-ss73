import React, { useState } from 'react';
import axios from 'axios';
import EditTaskModal from './EditTaskModal';
import Loading from './Loading';
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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const TaskItem: React.FC<TaskItemProps> = ({ task, tasks, onTaskUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      await axios.patch(`http://localhost:8080/tasks/${task.id}`, { completed: !task.completed });
      await delay(2000); 
      onTaskUpdate();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8080/tasks/${task.id}`);
      await delay(2000); 
      onTaskUpdate();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="task-item">
      {loading && <Loading />}
      <input type="checkbox" checked={task.completed} onChange={handleToggle} disabled={loading} />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.title}
      </span>
      <button className="edit-button" onClick={handleEdit} disabled={loading}>Sửa</button>
      <button className="delete-button" onClick={handleDelete} disabled={loading}>Xóa</button>
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
