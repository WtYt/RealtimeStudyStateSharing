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
        <h2>新規ルーム作成</h2>
        <input
          type="text"
          placeholder="ルーム名を入力"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <div
          style={{
            width: '90%',
            marginBottom: 16,
            maxHeight: 140,
            overflowY: 'auto',
            border: '1px solid #bfcfff',
            borderRadius: 6,
            padding: 8,
            background: '#f8faff',
          }}
        >
          {categories.length === 0 ? (
            <div style={{ color: '#888', fontSize: 14 }}>
              カテゴリが設定されていません
            </div>
          ) : (
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                maxHeight: 120,
                overflowY: 'auto',
              }}
            >
              {categories.map(({ key, label }) => (
                <li key={key} style={{ marginBottom: 4 }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      width: '100%',
                    }}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={key}
                      checked={selectedCategory === key}
                      onChange={() => setSelectedCategory(key)}
                      style={{ marginRight: 8 }}
                    />
                    {label}
                  </label>
                </li>
              ))}
            </ul>
          )}
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
