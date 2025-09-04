import React from 'react';
import { Box, Stack, Typography, Chip, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

export default function ResultsList({ loading, error, results }) {
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
                    {results.map((r) => (
                        <ListItem key={r.id} divider>
                            <ListItemText
                                primary={r.name ?? r.id}
                                secondary={
                                    <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
                                        <Typography variant="caption" color="text.secondary">
                                            参加人数: {r.memberCount ?? 0}
                                        </Typography>
                                        <span style={{ width: 1, height: 12, background: 'rgba(0,0,0,0.12)' }} />
                                        <Stack direction="row" spacing={0.5} sx={{ mt: 0.25 }}>
                                            {(r.categories ?? []).map((c) => (
                                                <Chip key={c} size="small" label={c} />
                                            ))}
                                        </Stack>
                                    </Stack>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
}
