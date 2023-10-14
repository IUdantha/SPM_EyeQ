import React from "react";
import "./Modal.css"; // Import CSS for styling

const Modal = ({onClose, content}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {content}
      </div>
    </div>
  );
};

export default Modal;
