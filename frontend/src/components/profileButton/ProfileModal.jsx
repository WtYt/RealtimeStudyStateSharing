import React from 'react';
import Profile from './Profile';
import './ProfileModal.css';

const ProfileModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <Profile />
      </div>
    </div>
  );
};

export default ProfileModal;
