import React, { useState, useEffect } from 'react';
import EachProfileEditPopup from '../../pages/EachProfileEditPopup';
import FavoriteRoomPopup from '../../pages/FavoriteRoomPopup';
import ConfirmPopup from '../ConfirmPopup';
import { DeleteAccount } from '../../api/auth';
import { listRooms } from '../../api/RoomSearch';
import './Profile.css';
import blueIcon from '../../userIcon/blue_icon.png';

const Profile = () => {
  const [isUserSettingOpen, setIsUserSettingOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [profile, setProfile] = useState({ id: 'me_demo', name: 'Me', status: 2, comment: 'デモ' });
  const [rooms, setRooms] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const toggleUserSetting = () => setIsUserSettingOpen(!isUserSettingOpen);

  const openPopup = (title) => {
    setPopupContent(title);
  };

  const closePopup = () => setPopupContent(null);

  const mockRooms = [
    { id: 1, name: 'Room A', isFavorite: true, isVisible: true },
    { id: 2, name: 'Room B', isFavorite: false, isVisible: false },
    { id: 3, name: 'Room C', isFavorite: true, isVisible: false },
  ];

  const handleAccountDelete = async () => {
    try {
      await DeleteAccount();
      localStorage.removeItem('isLoggedIn');
      window.location.reload();
    } catch (e) {
      alert('アカウント削除に失敗しました');
    }
    closePopup();
  };

  useEffect(() => {
    // load persisted profile and favorites
    try {
      const p = JSON.parse(localStorage.getItem('demo_profile'));
      if (p) setProfile((prev) => ({ ...prev, ...p }));
    } catch (e) { }
    try {
      const fav = JSON.parse(localStorage.getItem('demo_favorites')) || [];
      setFavorites(Array.isArray(fav) ? fav : []);
    } catch (e) { setFavorites([]); }

    (async () => {
      try {
        const all = await listRooms();
        setRooms(all);
      } catch (e) {
        setRooms([]);
      }
    })();
  }, []);

  const saveProfile = (next) => {
    const np = { ...profile, ...next };
    setProfile(np);
    localStorage.setItem('demo_profile', JSON.stringify(np));
  };


  return (
    <div>
      <img
        src={blueIcon}
        alt="ユーザーアイコン"
        style={{ width: 64, height: 64, borderRadius: '50%', marginBottom: 8 }}
      />
      <h2 className="profile-name">名前：{profile.name}</h2>
      <p>ID：{profile.id}</p>

      <div className="status-section">
        <p>ステータス</p>
        <label>
          <input type="radio" name="status" checked={profile.status === 2} onChange={() => saveProfile({ status: 2 })} /> 取り組み中
        </label>
        <label>
          <input type="radio" name="status" checked={profile.status === 1} onChange={() => saveProfile({ status: 1 })} /> 離席中
        </label>
        <label>
          <input type="radio" name="status" checked={profile.status === 0} onChange={() => saveProfile({ status: 0 })} /> オフライン
        </label>
      </div>

      <ul className="settings-list">
        <li onClick={() => openPopup('コメント編集')}>コメントの編集</li>
        <li>
          <div className="user-setting-header" onClick={toggleUserSetting}>
            ユーザ設定 <span>{isUserSettingOpen ? '▲' : '▼'}</span>
          </div>
          {isUserSettingOpen && (
            <ul className="sub-settings">
              <li onClick={() => openPopup('ニックネーム変更')}>
                ニックネームを変更
              </li>
              <li onClick={() => openPopup('アイコンを変更')}>
                アイコンを変更
              </li>
            </ul>
          )}
        </li>
        <li onClick={() => openPopup('お気に入りルーム設定')}>
          お気に入りルーム設定
        </li>
      </ul>

      <hr className="divider" />

      <button
        className="delete-account-btn"
        onClick={() => openPopup('アカウント削除')}
      >
        アカウントを削除
      </button>

      {popupContent === 'お気に入りルーム設定' && (
        <FavoriteRoomPopup onClose={closePopup} rooms={rooms} favorites={favorites} onSave={(nextFav) => { setFavorites(nextFav); localStorage.setItem('demo_favorites', JSON.stringify(nextFav)); closePopup(); }} />
      )}
      {popupContent &&
        popupContent !== 'お気に入りルーム設定' &&
        popupContent !== 'アカウント削除' && (
          <EachProfileEditPopup
            title={popupContent}
            placeholder={`${popupContent}を入力してください`}
            onClose={closePopup}
            onSave={(value) => {
              if (popupContent === 'ニックネーム変更' || popupContent === 'コメントの編集') {
                if (popupContent === 'ニックネーム変更') saveProfile({ name: value });
                if (popupContent === 'コメントの編集') saveProfile({ comment: value });
              }
              console.log(`${popupContent}: ${value}`);
            }}
          />
        )}
      {/* アカウント削除確認 */}
      {popupContent === 'アカウント削除' && (
        <ConfirmPopup
          message="本当にアカウントを削除しますか？"
          onClose={closePopup}
          onConfirm={handleAccountDelete}
          confirmText="削除"
          confirmType="danger"
        />
      )}
    </div>
  );
};

export default Profile;
