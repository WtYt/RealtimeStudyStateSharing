import React, { useState } from 'react';
import { useDisplayProfile } from '../../api/displayProfile';
import EachProfileEditPopup from '../../pages/EachProfileEditPopup';
import { commentEdit } from '../../api/commentEdit';
import FavoriteRoomPopup from '../../pages/FavoriteRoomPopup';
import ConfirmPopup from '../ConfirmPopup';
import { DeleteAccount } from '../../api/auth';
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

  // useDisplayProfileからデータ取得
  const profileData = useDisplayProfile();

  // アイコン画像パス
  const iconPath = profileData?.data?.profile_pic_path;
  // ステータス値
  const status = profileData?.data?.status;

  return (
    <div>
      <img
        src={iconPath}
        alt="ユーザーアイコン"
        style={{ width: 64, height: 64, borderRadius: '50%', marginBottom: 8 }}
      />
      <h2 className="profile-name">名前：{profileData?.data?.name ?? '---'}</h2>
      <p>メールアドレス：{profileData?.data?.user_id ?? '---'}</p>

      <div className="status-section">
        <p>ステータス</p>
        <label>
          <input type="radio" name="status" checked={status === 0} readOnly />{' '}
          取り組み中
        </label>
        <label>
          <input type="radio" name="status" checked={status === 1} readOnly />{' '}
          離席中
        </label>
        <label>
          <input type="radio" name="status" checked={status === 2} readOnly />{' '}
          オフライン
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
      {popupContent === 'コメント編集' && (
        <EachProfileEditPopup
          title={popupContent}
          placeholder={`${popupContent}を入力してください`}
          onClose={closePopup}
          onSave={async (value) => {
            await commentEdit(value);
          }}
        />
      )}
      {popupContent &&
        popupContent !== 'お気に入りルーム設定' &&
        popupContent !== 'アカウント削除' &&
        popupContent !== 'コメント編集' && (
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
