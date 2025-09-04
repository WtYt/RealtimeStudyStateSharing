// アカウント削除、サインアウト時に表示するポップアップ

import React from 'react';
import EachProfileEditPopup from '../pages/EachProfileEditPopup';

const ConfirmPopup = ({
  message,
  onConfirm,
  onClose,
  confirmText = 'OK',
  confirmType = 'primary',
}) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3>{message}</h3>
        <p>この操作を実行してもよろしいですか？</p>
        <div className="popup-buttons">
          <button className="cancel-btn" onClick={onClose}>
            キャンセル
          </button>
          <button className={`confirm-btn ${confirmType}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
