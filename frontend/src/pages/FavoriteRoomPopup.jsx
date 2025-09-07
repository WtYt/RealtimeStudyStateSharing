import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './FavoriteRoomPopup.css';

const FavoriteRoomPopup = ({ onClose, rooms = [], favorites = [], onSave }) => {
  const [roomList, setRoomList] = useState(() => {
    // merge favorites into rooms
    try {
      const fav = Array.isArray(favorites) ? favorites : [];
      return rooms.map((r) => ({ ...r, isFavorite: fav.includes(r.id), isVisible: true }));
    } catch (e) {
      return rooms;
    }
  });

  const toggleFavorite = (id) => {
    setRoomList(
      roomList.map((room) =>
        room.id === id ? { ...room, isFavorite: !room.isFavorite } : room
      )
    );
  };

  const toggleVisibility = (id) => {
    setRoomList(
      roomList.map((room) =>
        room.id === id ? { ...room, isVisible: !room.isVisible } : room
      )
    );
  };

  const handleSave = () => {
    const nextFav = roomList.filter((r) => r.isFavorite).map((r) => r.id);
    if (typeof onSave === 'function') onSave(nextFav);
    onClose();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3>お気に入りルーム設定</h3>
        <ul className="room-list">
          {roomList.map((room) => (
            <li key={room.id} className="room-item">
              <span>{room.name}</span>
              <FaStar
                className={`star-icon ${room.isFavorite ? 'active' : ''}`}
                onClick={() => toggleFavorite(room.id)}
              />
              <label className="switch">
                <input
                  type="checkbox"
                  checked={room.isVisible}
                  onChange={() => toggleVisibility(room.id)}
                />
                <span className="slider"></span>
              </label>
            </li>
          ))}
        </ul>
        <div className="popup-buttons">
          <button className="cancel-btn" onClick={onClose}>
            キャンセル
          </button>
          <button className="save-btn" onClick={handleSave}>
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteRoomPopup;
