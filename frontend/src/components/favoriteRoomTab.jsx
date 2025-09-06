import React, { useState } from 'react';
import './FavoriteRoomTab.css';

const FavoriteRoomTab = () => {
  const [activeRoom, setActiveRoom] = useState('room1');
  const rooms = ['room1', 'room2', 'room3'];

  return (
    <div className="room-tabs">
      {rooms.map((room) => (
        <button
          key={room}
          className={`tab${activeRoom === room ? ' active' : ''}`}
          onClick={() => setActiveRoom(room)}
        >
          <span>{room}</span>
        </button>
      ))}
    </div>
  );
};

export default FavoriteRoomTab;
