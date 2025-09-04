import React from 'react';
import RoomInfoButton from '../components/RoomInfoButton';
import ProfileButton from '../components/profileButton/ProfileButton';
import SignOutButton from '../components/SignOutButton';
import SearchButton from '../components/searchbutton/SearchButton';
import FavoriteRoomTab from '../components/FavoriteRoomTab';
import './Screen.css';

const Screen = () => {
  return (
    <div className="screen-container">
      <header className="header">
        <RoomInfoButton />
        <div className="header-right">
          <ProfileButton />
          <SignOutButton />
        </div>
      </header>
      <main className="main-content">
        <p>ここにルームのメインコンテンツが表示されます。</p>
      </main>
      <SearchButton />
      <footer className="footer">
        <FavoriteRoomTab />
      </footer>
    </div>
  );
};

export default Screen;
