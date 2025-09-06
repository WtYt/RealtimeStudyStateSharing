import './App.css';
import React, { useState } from 'react';
import Screen from './pages/screen';
import SignInScreen from './pages/SignInScreen';
import Modal from 'react-modal';
Modal.setAppElement('#root');

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return isLoggedIn ? (
    <Screen onSignOut={handleSignOut} />
  ) : (
    <SignInScreen onLoginSuccess={handleLoginSuccess} />
  );
}

export default App;
