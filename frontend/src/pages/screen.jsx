import React, { useEffect, useState } from 'react';
import RoomInfoButton from '../components/roomInfoButton';
import ProfileButton from '../components/profileButton/ProfileButton';
import SignOutButton from '../components/SignOutButton';
import SearchButton from '../components/searchbutton/SearchButton';
import CreateRoomButton from '../components/createRoomButton/CreateRoomButton';
import FavoriteRoomTab from '../components/FavoriteRoomTab';
import SearchPopupProvider from './searchPopup';
import Blackboard from '../components/seating/Blackboard';
import RoomDeskGrid from '../components/seating/RoomDeskGrid';
import { searchRoomsByCategory, searchRoomsByName } from '../api/RoomSearch';
import { enterRoom, getCurrentRoomIdApi } from '../api/roomChange';
import { fetchRoomById } from '../api/demoBackend';
import categories from '../components/categories.json'
import './Screen.css';

// デモ用のメンバー情報。実際はAPIから取得する。ルーム内人数は最大12を想定。
const demoMembers = [
  { id: 'u1', name: 'Alice', status: 2, comment: '英単語を覚える' },
  { id: 'u2', name: 'Bob', status: 1, comment: '過去問演習' },
  { id: 'u3', name: 'Charlie', status: 0, comment: '' },
  { id: 'u4', name: 'David', status: 2, comment: 'リスニング強化' },
  { id: 'u5', name: 'Eve', status: 1, comment: '文法の復習' },
  { id: 'u6', name: 'Frank', status: 0, comment: '' },
  { id: 'u7', name: 'Grace', status: 2, comment: '模試を解く' },
  { id: 'u8', name: 'Heidi', status: 1, comment: '単語帳の見直し' },
  { id: 'u9', name: 'Ivan', status: 0, comment: '' },
  { id: 'u10', name: 'Judy', status: 2, comment: 'リーディング練習' },
  { id: 'u11', name: 'Mallory', status: 1, comment: '発音練習' },
  { id: 'u12', name: 'Niaj', status: 0, comment: '' },
];

const Screen = ({ onSignOut }) => {
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const curId = await getCurrentRoomIdApi();
        if (!curId) return;
        const room = await fetchRoomById(curId);
        if (!mounted) return;
        setCurrentRoom(room);
      } catch (e) {
        // ignore
      }
    })();
    const onChange = async (e) => {
      try {
        const curId = await getCurrentRoomIdApi();
        if (!curId) {
          setCurrentRoom(null);
          return;
        }
        const room = await fetchRoomById(curId);
        setCurrentRoom(room);
      } catch (err) {
        // ignore
      }
    };
    window.addEventListener('demoCurrentRoomChanged', onChange);
    return () => { mounted = false; };
  }, []);

  const handleRoomSelect = async (room) => {
    try {
      // read current profile from localStorage
      let user = { id: 'me_demo', name: 'Me', status: 2, comment: 'デモ' };
      try {
        const p = JSON.parse(localStorage.getItem('demo_profile'));
        if (p && p.id) user = p;
      } catch (e) { }

      await enterRoom(room.id || room.doc_id || room._id, { user });
      const curId = await getCurrentRoomIdApi();
      const r = await fetchRoomById(curId);
      setCurrentRoom(r);
    } catch (e) {
      console.error('enter room failed', e);
    }
  };

  return (
    <div className="screen-container">
      <header className="header">
        <Blackboard
          title="Sharedy Hub"
          subtitle="みんなで一緒に勉強しよう！"
          left={
            <div className="bb-left">
              <div className="bb-action" aria-label="ルーム情報" tabIndex={0}>
                <RoomInfoButton
                  room={
                    currentRoom
                      ? {
                        name: currentRoom.name,
                        category: currentRoom.category,
                        members: (currentRoom.members || []).map((m) => ({ id: m.id, name: m.name })),
                      }
                      : null
                  }
                />
              </div>
            </div>
          }
          right={
            <div className="bb-right">
              <div className="bb-action" aria-label="プロフィール" tabIndex={0}>
                <ProfileButton />
              </div>
              <div className="bb-action" aria-label="サインアウト" tabIndex={0}>
                <SignOutButton onSignOut={onSignOut} />
              </div>
            </div>
          }
        />
      </header>
      <main className="main-content">
        {/* <p>ここにルームのメインコンテンツが表示されます。</p> */}
        <RoomDeskGrid members={(currentRoom && currentRoom.members) ? currentRoom.members : demoMembers} />
      </main>
      {/* 左下：ルーム作成ボタン */}
      <div
        style={{
          position: 'fixed',
          left: 24,
          bottom: 120,
          zIndex: 101,
        }}
      >
        <CreateRoomButton />
      </div>
      {/* 右下：検索ボタン */}
      <div
        style={{
          position: 'fixed',
          right: 24,
          bottom: 120,
          zIndex: 101,
        }}
      >
        <SearchPopupProvider
          categories={categories}
          onSearchByName={searchRoomsByName}
          onSearchByCategory={searchRoomsByCategory}
          onRoomClick={handleRoomSelect}
        >
          {/* API連携ができたら、onSearchByName/onSearchByCategory/onRoomClickを渡す
        categoriesはハードコーディング  */}
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
