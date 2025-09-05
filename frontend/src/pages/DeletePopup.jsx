import React from 'react';
import './EachProfileEditPopup'; // 既存PopupのCSSを流用

const DeletePopup = ({ onClose, onDelete, message }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3>{message || '本当に削除しますか？'}</h3>
        <p>この操作は取り消せません。</p>
        <div className="popup-buttons">
          <button className="cancel-btn" onClick={onClose}>
            キャンセル
          </button>
          <button className="delete-btn" onClick={onDelete}>
            削除
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
