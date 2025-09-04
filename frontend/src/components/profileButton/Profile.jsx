import React, { useState } from 'react';
import EachProfileEditPopup from '../../pages/EachProfileEditPopup';
import FavoriteRoomPopup from '../../pages/FavoriteRoomPopup';
import ConfirmPopup from '../ConfirmPopup';
import './Profile.css';

const Profile = () => {
  const [isUserSettingOpen, setIsUserSettingOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

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

  const handleAccountDelete = () => {
    console.log('アカウント削除しました');
    closePopup();
  };

  return (
    <div>
      <h2 className="profile-name">名前：山田太郎</h2>
      <p>ID：12345</p>

      <div className="status-section">
        <p>ステータス</p>
        <label>
          <input type="radio" name="status" /> 取り組み中
        </label>
        <label>
          <input type="radio" name="status" /> 離席中
        </label>
        <label>
          <input type="radio" name="status" /> オフライン
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
        <FavoriteRoomPopup onClose={closePopup} rooms={mockRooms} />
      )}
      {popupContent &&
        popupContent !== 'お気に入りルーム設定' &&
        popupContent !== 'アカウント削除' && (
          <EachProfileEditPopup
            title={popupContent}
            placeholder={`${popupContent}を入力してください`}
            onClose={closePopup}
            onSave={(value) => console.log(`${popupContent}: ${value}`)}
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
