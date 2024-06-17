import React, { useState } from 'react';
import axios from 'axios';
import ConfirmModal from './ConfirmModal';
import '../CSS/TaskActions.css';

interface TaskActionsProps {
  onClearCompleted: () => void;
  onClearAll: () => void;
}

const TaskActions: React.FC<TaskActionsProps> = ({ onClearCompleted, onClearAll }) => {
  const [isClearCompletedModalOpen, setIsClearCompletedModalOpen] = useState(false);
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);

  const handleClearCompleted = () => {
    axios.get('http://localhost:8080/tasks')
      .then(response => {
        response.data.forEach((task: any) => {
          if (task.completed) {
            axios.delete(`http://localhost:8080/tasks/${task.id}`);
          }
        });
      })
      .then(() => onClearCompleted());
  };

  const handleClearAll = () => {
    axios.get('http://localhost:8080/tasks')
      .then(response => {
        response.data.forEach((task: any) => {
          axios.delete(`http://localhost:8080/tasks/${task.id}`);
        });
      })
      .then(() => onClearAll());
  };

  return (
    <div className="task-actions">
      <button onClick={() => setIsClearCompletedModalOpen(true)}>Xóa công việc hoàn thành</button>
      <button onClick={() => setIsClearAllModalOpen(true)}>Xóa tất cả công việc</button>

      <ConfirmModal
        isOpen={isClearCompletedModalOpen}
        onRequestClose={() => setIsClearCompletedModalOpen(false)}
        onConfirm={() => {
          handleClearCompleted();
          setIsClearCompletedModalOpen(false);
        }}
        message="Bạn có chắc chắn muốn xóa tất cả công việc đã hoàn thành không?"
      />

      <ConfirmModal
        isOpen={isClearAllModalOpen}
        onRequestClose={() => setIsClearAllModalOpen(false)}
        onConfirm={() => {
          handleClearAll();
          setIsClearAllModalOpen(false);
        }}
        message="Bạn có chắc chắn muốn xóa tất cả công việc không?"
      />
    </div>
  );
};

export default TaskActions;
