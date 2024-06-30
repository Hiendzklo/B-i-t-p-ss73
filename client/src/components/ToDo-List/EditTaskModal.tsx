import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Loading from './Loading';
import '../CSS/EditTaskModal.css';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface EditTaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  task: Task;
  tasks: Task[];
  onTaskUpdate: () => void;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onRequestClose, task, tasks, onTaskUpdate }) => {
  const [newTitle, setNewTitle] = useState(task.title);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = async () => {
    if (newTitle.trim() === '') {
      setError('Tên công việc không được phép để trống');
      return;
    }

    if (tasks.some(t => t.title === newTitle && t.id !== task.id)) {
      setError('Tên công việc không được phép trùng');
      return;
    }

    setLoading(true);
    try {
      await axios.patch(`http://localhost:8080/tasks/${task.id}`, { title: newTitle });
      await delay(2000); 
      onTaskUpdate();
      onRequestClose();
    } catch (error) {
      setError('Có lỗi xảy ra khi cập nhật công việc');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setNewTitle(task.title);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Chỉnh sửa công việc"
      className="edit-task-modal"
      overlayClassName="edit-task-overlay"
    >
      <h2>Chỉnh sửa công việc</h2>
      {loading && <Loading />}
      {error && <p className="error">{error}</p>}
      <input 
        type="text" 
        value={newTitle} 
        onChange={(e) => setNewTitle(e.target.value)} 
        disabled={loading}
      />
      <button className="save-button" onClick={handleSave} disabled={loading}>Cập nhật</button>
      <button className="cancel-button" onClick={handleCancel} disabled={loading}>Hủy</button>
    </Modal>
  );
};

export default EditTaskModal;
