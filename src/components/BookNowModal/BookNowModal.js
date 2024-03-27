import React from 'react';
import './BookNowModal.css'; // Import the CSS for styling

const BookNowModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Book Now</h2>
        <p>Fill in your details to book your service.</p>
        {/* Add form or content here */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BookNowModal;
