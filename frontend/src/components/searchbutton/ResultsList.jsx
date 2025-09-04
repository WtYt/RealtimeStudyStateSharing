import React from 'react';
import { Box, Stack, Typography, Chip, List, ListItem, ListItemText, CircularProgress, Link } from '@mui/material';

/**
 * results: Array<{ id: string, name: string, category?: string, memberCount?: number }>
 * onRoomClick?: (room) => void
 */
export default function ResultsList({ loading, error, results, onRoomClick }) {
    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>検索結果</Typography>

            {loading && (
                <Stack direction="row" alignItems="center" spacing={1}>
                    <CircularProgress size={20} />
                    <Typography variant="body2">検索中...</Typography>
                </Stack>
            )}

            {!loading && error && (
                <Typography variant="body2" color="error">{error}</Typography>
            )}

            {!loading && !error && (!results || results.length === 0) && (
                <Typography variant="body2" color="text.secondary">該当なし</Typography>
            )}

            {!loading && !error && results?.length > 0 && (
                <List dense sx={{ maxHeight: 260, overflow: 'auto', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    {results.map((r) => {
                        const category = r.category || '';
                        const members = r.memberCount ?? 0;

                        return (
                            <ListItem key={r.id} divider>
                                <ListItemText
                                    primary={
                                        // ルーム名はクリック可能（拡張ポイント：join機能をここに接続）
                                        <Link
                                            component="button"
                                            type="button"
                                            variant="body1"
                                            underline="hover"
                                            onClick={() => onRoomClick?.(r)}
                                            sx={{ textAlign: 'left', padding: 0 }}
                                        >
                                            {r.name ?? r.id}
                                        </Link>
                                    }
                                    secondary={
                                        <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
                                            <Typography variant="caption" color="text.secondary">
                                                参加人数: {members}
                                            </Typography>
                                            {category && (
                                                <>
                                                    <span style={{ width: 1, height: 12, background: 'rgba(0,0,0,0.12)' }} />
                                                    <Chip size="small" label={category} />
                                                </>
                                            )}
                                        </Stack>
                                    }
                                />
                            </ListItem>
                        );
                    })}
                </List>
            )}
        </Box>
    );
}
