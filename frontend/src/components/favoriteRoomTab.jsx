import React, { useEffect, useState } from 'react';
import './FavoriteRoomTab.css';
import { enterRoom, getCurrentRoomIdApi } from '../api/roomChange';
import { listRooms } from '../api/RoomSearch';

// helper to read current profile (falls back to demo user)
function readProfile() {
  try {
    const p = JSON.parse(localStorage.getItem('demo_profile'));
    if (p && p.id) return p;
  } catch (e) { }
  return { id: 'me_demo', name: 'Me', status: 2, comment: 'デモ' };
}

const FavoriteRoomTab = () => {
  const [activeRoom, setActiveRoom] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const cur = await getCurrentRoomIdApi();
      if (!mounted) return;
      setActiveRoom(cur);

      try {
        const all = await listRooms();
        if (!mounted) return;
        // pick first 5 as favorites for demo
        setFavorites(all.slice(0, 5));
      } catch (e) {
        // ignore
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleClick = async (roomId) => {
    const user = readProfile();
    await enterRoom(roomId, { user });
    setActiveRoom(roomId);
  };

  return (
    <div className="room-tabs">
      {favorites.map((r) => (
        <button
          key={r.id}
          className={`tab${String(activeRoom) === String(r.id) ? ' active' : ''}`}
          onClick={() => handleClick(r.id)}
        >
          <span>{r.name}</span>
        </button>
      ))}
    </div>
  );
};

export default FavoriteRoomTab;
