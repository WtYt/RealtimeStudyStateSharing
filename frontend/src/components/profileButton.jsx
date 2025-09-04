import React, { useState, useEffect, useRef } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import Profile from '../pages/Profile';
import './ProfileButton.css';

const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // ポップアップ外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="profile-button-wrapper" ref={popupRef}>
      <button className="profile-btn" onClick={togglePopup}>
        <MdAccountCircle size={32} />
      </button>
      {isOpen && (
        <div className="profile-popup-wrapper">
          <Profile />
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
