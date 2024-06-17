import React from 'react';
import Modal from 'react-modal';
import '../CSS/ConfirmModal.css';

interface ConfirmModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onRequestClose, onConfirm, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Xác nhận hành động"
      className="confirm-modal"
      overlayClassName="confirm-modal-overlay"
    >
      <h2>Xác nhận</h2>
      <p>{message}</p>
      <button className="confirm-button" onClick={onConfirm}>Xác nhận</button>
      <button className="cancel-button" onClick={onRequestClose}>Hủy</button>
    </Modal>
  );
};

export default ConfirmModal;
