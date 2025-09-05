import React from 'react';
import Profile from './Profile';
import './ProfileModal.css';

const ProfileModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="閉じる"
        >
          閉じる
        </button>
        <Profile />
      </div>
    </div>
  );
};

export default ProfileModal;
