import React, { useState, useRef, useEffect } from 'react';
import './CreateRoomPopup.css';
import { categories } from './categories';
import CategorySelector from '../searchbutton/CategorySelector';

const CreateRoomPopup = ({ onClose }) => {
  const [roomName, setRoomName] = useState('');
  // 単一選択用: Setではなくstringで管理
  const [selectedCategory, setSelectedCategory] = useState('');
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  // 外側クリックで閉じる
  useEffect(() => {
    function handleClick(e) {
      if (
        overlayRef.current &&
        contentRef.current &&
        e.target === overlayRef.current
      ) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  const handleCreate = () => {
    if (roomName.trim() === '' || !selectedCategory) return;
    // TODO: ここでルーム作成処理を実装（API呼び出しなど）
    console.log('新規ルーム作成:', roomName, selectedCategory);
    onClose();
  };

  return (
    <div className="popup-overlay" ref={overlayRef}>
      <div className="popup-content" ref={contentRef}>
        <button
          className="popup-close-btn"
          onClick={onClose}
          aria-label="閉じる"
        >
          閉じる
        </button>
        <h2>新規ルーム作成</h2>
        <input
          type="text"
          placeholder="ルーム名を入力"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <div style={{ width: '90%', marginBottom: 16 }}>
          <label style={{ fontWeight: 500, marginBottom: 8, display: 'block' }}>
            カテゴリ選択
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #bfcfff',
              fontSize: '1rem',
              background: '#f8faff',
            }}
          >
            <option value="" disabled>
              カテゴリを選択
            </option>
            {categories.map(({ key, label }) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="popup-actions">
          <button onClick={onClose}>キャンセル</button>
          <button
            className="primary"
            onClick={handleCreate}
            disabled={roomName.trim() === '' || !selectedCategory}
          >
            作成
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomPopup;
