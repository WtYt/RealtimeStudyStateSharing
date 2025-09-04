import React from 'react';
import RoomInfoButton from '../components/RoomInfoButton';
import ProfileButton from '../components/profileButton/ProfileButton';
import SignOutButton from '../components/SignOutButton';
import SearchButton from '../components/searchbutton/SearchButton';
import FavoriteRoomTab from '../components/FavoriteRoomTab';
import SearchPopupProvider from './searchPopup';
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
      <SearchPopupProvider>
        {/* API連携ができたら、onSearchByName/onSearchByCategory/onRoomClickを渡す
        categoriesもAPIから取得したものを渡す */}
        <SearchButton />
      </SearchPopupProvider>
      <footer className="footer">
        <FavoriteRoomTab />
      </footer>
    </div>
  );
};

export default Screen;