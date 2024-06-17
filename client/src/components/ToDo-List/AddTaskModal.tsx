import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../CSS/AddTaskModal.css'

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface AddTaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  tasks: Task[];
  onTaskAdded: (task: Task) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onRequestClose, tasks, onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setError('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    if (title.trim() === '') {
      setError('Tên công việc không được phép để trống');
      return;
    }

    if (tasks.some(t => t.title === title)) {
      setError('Tên công việc không được phép trùng');
      return;
    }

    axios.post('http://localhost:8080/tasks', { title, completed: false })
      .then(response => {
        onTaskAdded(response.data);
        onRequestClose();
      })
      .catch(error => {
        setError('Có lỗi xảy ra khi thêm công việc');
      });
  };

  const handleCancel = () => {
    setTitle('');
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Thêm công việc mới"
      className="add-task-modal"
      overlayClassName="add-task-overlay"
    >
      <h2>Thêm công việc mới</h2>
      {error && <p className="error">{error}</p>}
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nhập tên công việc"
      />
      <button className="save-button" onClick={handleSave}>Thêm</button>
      <button className="cancel-button" onClick={handleCancel}>Hủy</button>
    </Modal>
  );
};

export default AddTaskModal;
