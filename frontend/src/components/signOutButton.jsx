import React, { useState } from 'react';
import { SignOut } from '../api/auth';
import { PiSignOutBold } from 'react-icons/pi';
import ConfirmPopup from './ConfirmPopup';
import Portal from './Portal';
import './SignOutButton.css';

const SignOutButton = ({ onSignOut }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSignOut = async () => {
    setLoading(true);
    try {
      await SignOut();
      localStorage.removeItem('isLoggedIn');
      if (onSignOut) onSignOut();
    } catch (e) {
      alert('サインアウトに失敗しました');
    } finally {
      setLoading(false);
      setShowPopup(false);
    }
  };

  return (
    <>
      <button
        className="signout-btn"
        onClick={() => setShowPopup(true)}
        disabled={loading}
      >
        <PiSignOutBold size={60} />
      </button>
      {showPopup && (
        <Portal>
          <ConfirmPopup
            message="サインアウトしますか？"
            onClose={() => setShowPopup(false)}
            onConfirm={handleSignOut}
            confirmText="サインアウト"
            confirmType="primary"
          />
        </Portal>
      )}
    </>
  );
};

export default SignOutButton;
