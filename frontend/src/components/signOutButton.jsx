import React from 'react';
import { PiSignOutBold } from 'react-icons/pi';
import './SignOutButton.css';

const SignOutButton = () => {
  const handleSignOut = () => {
    console.log('サインアウト処理を実行');
    // TODO: Firebase Authなどでサインアウト処理を実装
  };

  return (
    <button className="signout-btn" onClick={handleSignOut}>
      <PiSignOutBold size={36} />
    </button>
  );
};

export default SignOutButton;
