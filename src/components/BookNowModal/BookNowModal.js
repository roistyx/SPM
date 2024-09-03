import React from 'react';
import Stepper from '../../features/Stepper/Stepper.js';
import './BookNowModal.css';

const BookNowModal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {content}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BookNowModal;
