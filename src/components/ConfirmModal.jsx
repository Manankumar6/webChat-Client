import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const ConfirmModal = ({ open, handleClose, handleConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
    >
      <div className="modal">
        <h2 id="confirm-modal-title">Confirm Navigation</h2>
        <p id="confirm-modal-description">Are you sure you want to leave the chat and go back to the home page?</p>
        <div className="modal-buttons">
          <Button variant="contained" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirm}>Confirm</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
