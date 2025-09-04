import React from 'react';
import RoomInfoButton from '../components/RoomInfoButton';
import ProfileButton from '../components/profileButton/ProfileButton';
import SignOutButton from '../components/SignOutButton';
import SearchButton from '../components/searchbutton/SearchButton';
import CreateRoomButton from '../components/createRoomButton/CreateRoomButton';
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
      <div
        style={{
          position: 'fixed',
          right: 80,
          bottom: 96,
          zIndex: 101,
          display: 'flex',
          gap: 12,
        }}
      >
        <CreateRoomButton />
        <SearchButton />
      </div>
      <footer className="footer">
        <FavoriteRoomTab />
      </footer>
    </div>
  );
};

export default Screen;
