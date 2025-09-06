import React, { useState } from 'react';
import './EachProfileEditPopup.css';

const EachProfileEditPopup = ({ title, placeholder, onClose, onSave }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSave = () => {
    onSave(inputValue);
    onClose();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        {title === 'アイコンを変更' ? (
          <div
            style={{
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            {['blue_icon.png', 'pink_icon.png'].map((iconFile) => (
              <button
                key={iconFile}
                type="button"
                style={{
                  background: inputValue === iconFile ? '#eaf2ff' : '#fff',
                  border:
                    inputValue === iconFile
                      ? '2px solid #4f8cff'
                      : '1px solid #ccc',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  padding: '8px',
                }}
                onClick={() => setInputValue(iconFile)}
              >
                <img
                  src={'/userIcon/' + iconFile}
                  alt={iconFile}
                  style={{ width: 48, height: 48, borderRadius: '50%' }}
                />
              </button>
            ))}
          </div>
        ) : (
          <textarea
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        )}
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

export default EachProfileEditPopup;
