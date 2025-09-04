import React, { useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import ProfileModal from './ProfileModal';
import './ProfileButton.css';

const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="profile-button-wrapper">
      <button className="profile-btn" onClick={() => setIsOpen(true)}>
        <MdAccountCircle size={32} />
      </button>
      {isOpen && <ProfileModal onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default ProfileButton;
