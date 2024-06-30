import React, { useState } from 'react';
import axios from 'axios';
import ConfirmModal from './ConfirmModal';
import Loading from './Loading';
import '../CSS/TaskActions.css';

interface TaskActionsProps {
  onClearCompleted: () => void;
  onClearAll: () => void;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const TaskActions: React.FC<TaskActionsProps> = ({ onClearCompleted, onClearAll }) => {
  const [isClearCompletedModalOpen, setIsClearCompletedModalOpen] = useState(false);
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClearCompleted = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/tasks');
      await Promise.all(
        response.data.map((task: any) => {
          if (task.completed) {
            return axios.delete(`http://localhost:8080/tasks/${task.id}`);
          }
          return null;
        })
      );
      await delay(2000);
      onClearCompleted();
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/tasks');
      await Promise.all(
        response.data.map((task: any) => axios.delete(`http://localhost:8080/tasks/${task.id}`))
      );
      await delay(2000); 
      onClearAll();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-actions">
      {loading && <Loading />}
      <button onClick={() => setIsClearCompletedModalOpen(true)} disabled={loading}>
        Xóa công việc đã hoàn thành
      </button>
      <button onClick={() => setIsClearAllModalOpen(true)} disabled={loading}>
        Xóa tất cả công việc
      </button>

      <ConfirmModal
        isOpen={isClearCompletedModalOpen}
        onRequestClose={() => setIsClearCompletedModalOpen(false)}
        onConfirm={handleClearCompleted}
        message="Bạn có chắc chắn muốn xóa tất cả công việc đã hoàn thành?"
      />

      <ConfirmModal
        isOpen={isClearAllModalOpen}
        onRequestClose={() => setIsClearAllModalOpen(false)}
        onConfirm={handleClearAll}
        message="Bạn có chắc chắn muốn xóa tất cả công việc?"
      />
    </div>
  );
};

export default TaskActions;
