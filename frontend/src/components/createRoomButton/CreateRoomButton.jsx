import React, { useState } from 'react';
import { FaCirclePlus } from 'react-icons/fa6';
import CreateRoomPopup from './CreateRoomPopup';
import './CreateRoomButton.css';

const CreateRoomButton = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className="create-room-btn" onClick={() => setShowPopup(true)}>
        <FaCirclePlus size={60} />
      </div>
      {showPopup && <CreateRoomPopup onClose={() => setShowPopup(false)} />}
    </>
  );
};

export default CreateRoomButton;
