import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import CreateRoomPopup from './CreateRoomPopup';
import './CreateRoomButton.css';

const CreateRoomButton = ({ onRoomCreated }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className="create-room-btn" onClick={() => setShowPopup(true)}>
        <AiOutlinePlus size={60} />
      </div>
      {showPopup && (
        <CreateRoomPopup
          onClose={() => setShowPopup(false)}
          onRoomCreated={onRoomCreated}
        />
      )}
    </>
  );
};

export default CreateRoomButton;
