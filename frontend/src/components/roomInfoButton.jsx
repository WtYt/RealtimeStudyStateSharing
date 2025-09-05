import React, { useState } from 'react';
import Modal from 'react-modal';
import './RoomInfoButton.css';
import { MdMeetingRoom } from 'react-icons/md';
import RoomInfoContent from '../pages/roomInfo'; // モーダル中身を分離して再利用

/**
 * props:
 * - room: {
 *     name?: string,
 *     category?: string,
 *     members?: Array<{ id?: string, name?: string }>
 *   }
 */
const RoomInfoButton = ({ room = {} }) => {
  const [open, setOpen] = useState(false);

  const { name = '未設定', members = [] } = room;

  // 単一カテゴリ（参照のみ）
  const category = room.category || '';

  // react-modal のスタイル（既存に合わせる）
  const modalStyles = {
    overlay: { backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 1300 },
    content: {
      inset: '50% auto auto 50%',
      transform: 'translate(-50%, -50%)',
      padding: 0,
      border: 'none',
      background: 'transparent',
    },
  };

  return (
    <>
      <MdMeetingRoom
        className="room-info-btn"
        size={60}
        style={{ color: 'inherit', cursor: 'pointer' }}
        onClick={() => setOpen(true)}
        aria-label="ルーム情報を開く"
        role="button"
      />

      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        style={modalStyles}
        contentLabel="ルーム情報"
      >
        {/* 分離した RoomInfoContent を利用（onClose を渡す） */}
        <RoomInfoContent room={room} onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
};

export default RoomInfoButton;

{
  /*import React, { useState } from 'react';
import Modal from 'react-modal';
import './RoomInfoButton.css';
import { MdMeetingRoom } from 'react-icons/md';
import {
  Box, Stack, Typography, Divider, Chip, List, ListItem, ListItemText, Avatar, Button,
} from '@mui/material';

/**
 * props:
 * - room: {
 *     name?: string,
 *     category?: string,            // ← 単一カテゴリ
 *     members?: Array<{ id?: string, name?: string }>
 *   }

const RoomInfoButton = ({ room = {} }) => {
  const [open, setOpen] = useState(false);

  const {
    name = '未設定',
    members = [],
  } = room;

  // 単一カテゴリ
  const category = room.category || '';

  // モーダルのスタイル
  const modalStyles = {
    overlay: { backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 1300 },
    content: {
      inset: '50% auto auto 50%',
      transform: 'translate(-50%, -50%)',
      padding: 0, border: 'none', background: 'transparent',
    },
  };

  return (
    <>
      <MdMeetingRoom
        className="room-info-btn"
        size="40px"
        style={{ color: 'inherit', cursor: 'pointer' }}
        onClick={() => setOpen(true)}
        aria-label="ルーム情報を開く"
        role="button"
      />

      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        shouldCloseOnOverlayClick // モーダル外クリックで閉じる
        shouldCloseOnEsc // ESCキーで閉じる
        style={modalStyles}
        contentLabel="ルーム情報"
      >
        <Box sx={{ width: 480, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 10, p: 2.5 }}>
          {/* ヘッダ }
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="h6">ルーム情報</Typography>
            <Button onClick={() => setOpen(false)}>閉じる</Button>
          </Stack>

          {/* ルーム名 }
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{name}</Typography>
          </Box>

          {/* カテゴリ（単一） }
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>カテゴリ</Typography>
            {category ? (
              <Chip size="small" label={category} />
            ) : (
              <Typography variant="body2" color="text.secondary">なし</Typography>
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* メンバー（名前だけ列挙） }
          <Box>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="subtitle2">メンバー</Typography>
              <Typography variant="caption" color="text.secondary">
                参加人数: {members.length}
              </Typography>
            </Stack>

            {members.length === 0 ? (
              <Typography variant="body2" color="text.secondary">メンバーはいません</Typography>
            ) : (
              <List dense sx={{ maxHeight: 280, overflow: 'auto', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                {members.map((m, idx) => {
                  const nm = m.name || '名無し';
                  const initial = (nm[0] || '?').toUpperCase();
                  return (
                    <ListItem key={m.id || `${nm}-${idx}`} divider>
                      <Avatar sx={{ mr: 1, width: 28, height: 28 }}>{initial}</Avatar>
                      <ListItemText primary={nm} />
                    </ListItem>
                  );
                })}
              </List>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default RoomInfoButton;

// 使用例
// screen.jsx
{/*<RoomInfoButton
  room={{
    name: 'TOEIC',
    category: '英語',              // 単一カテゴリ
    members: [{ id: 'u1', name: 'Alice' }, { id: 'u2', name: 'Bob' }],
  }}
/>*/
}
