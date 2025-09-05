import React from 'react';
import RoomInfoButton from '../components/roomInfoButton';
import ProfileButton from '../components/profileButton/ProfileButton';
import SignOutButton from '../components/SignOutButton';
import SearchButton from '../components/searchbutton/SearchButton';
import CreateRoomButton from '../components/createRoomButton/CreateRoomButton';
import FavoriteRoomTab from '../components/FavoriteRoomTab';
import SearchPopupProvider from './searchPopup';
import './Screen.css';

const Screen = () => {
  return (
    <div className="screen-container">
      <header className="header">
        {/* RoomInfoButton に room を渡すことでモーダル内に詳細を表示する。以下はサンプル。 */}
        <RoomInfoButton room={{
          name: 'TOEIC',
          category: '英語',
          members: [{ id: 'u1', name: 'Alice' }, { id: 'u2', name: 'Bob' }],
        }} />
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
        <SearchPopupProvider>
          {/* API連携ができたら、onSearchByName/onSearchByCategory/onRoomClickを渡す
        categoriesもAPIから取得したものを渡す */}
          <SearchButton />
        </SearchPopupProvider>
      </div>
      <footer className="footer">
        <FavoriteRoomTab />
      </footer>
    </div>
  );
};

export default Screen;
