import React from 'react';
import {
    Box, Stack, Typography, Divider, Chip, List, ListItem, ListItemText, Avatar, Button,
} from '@mui/material';

/**
 * Props:
 * - room: {
 *     name?: string,
 *     category?: string,
 *     members?: Array<{ id?: string, name?: string }>
 *   }
 * - onClose?: () => void   // モーダル内で使う場合に閉じるハンドラを受け取る
 *
 * このコンポーネントは「モーダルの中身」を表します。
 * RoomInfoButton から呼び出して使う想定です（onClose を渡せます）。
 */
export default function RoomInfoContent({ room = {}, onClose }) {
    const {
        name = '未設定',
        members = [],
    } = room;

    const category = room.category || '';

    return (
        <Box sx={{ width: 480, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 10, p: 2.5 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="h6">ルーム情報</Typography>
                <Button onClick={() => onClose?.()}>閉じる</Button>
            </Stack>

            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{name}</Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>カテゴリ</Typography>
                {category ? (
                    <Chip size="small" label={category} />
                ) : (
                    <Typography variant="body2" color="text.secondary">なし</Typography>
                )}
            </Box>

            <Divider sx={{ my: 2 }} />

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
    );
}
