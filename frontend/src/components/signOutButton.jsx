import React, { useState } from 'react';
import { PiSignOutBold } from 'react-icons/pi';
import ConfirmPopup from './ConfirmPopup';
import './SignOutButton.css';

const SignOutButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const handleSignOut = () => {
    console.log('サインアウト処理を実行');
    setShowPopup(false);
    // TODO: Firebase Authなどでサインアウト処理を実装
  };

  return (
    <>
      <button className="signout-btn" onClick={() => setShowPopup(true)}>
        <PiSignOutBold size={28} />
      </button>
      {showPopup && (
        <ConfirmPopup
          message="サインアウトしますか？"
          onClose={() => setShowPopup(false)}
          onConfirm={handleSignOut}
          confirmText="サインアウト"
          confirmType="primary"
        />
      )}
    </>
  );
};

export default SignOutButton;
