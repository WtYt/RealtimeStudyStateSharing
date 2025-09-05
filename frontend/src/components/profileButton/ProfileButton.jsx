import React, { useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import ProfileModal from './ProfileModal';
import Portal from '../Portal';
import './ProfileButton.css';

const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="profile-button-wrapper">
      <button className="profile-btn" onClick={() => setIsOpen(true)}>
        <MdAccountCircle size={32} />
      </button>
      {isOpen && <Portal><ProfileModal onClose={() => setIsOpen(false)} /></Portal>}
    </div>
  );
};

export default ProfileButton;
