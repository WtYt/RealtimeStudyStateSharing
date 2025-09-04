import React from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

export default function CategorySelector({ categories = [], checked, setChecked }) {
    const toggle = (key) => {
        setChecked(prev => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key); else next.add(key);
            return next;
        });
    };

    return (
        <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                既存カテゴリから複数選択（OR検索）
            </Typography>
            <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1, maxHeight: 180, overflow: 'auto' }}>
                {categories.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        カテゴリが設定されていません
                    </Typography>
                ) : (
                    <FormGroup>
                        {categories.map(({ key, label }) => (
                            <FormControlLabel
                                key={key}
                                control={<Checkbox checked={checked.has(key)} onChange={() => toggle(key)} />}
                                label={label}
                            />
                        ))}
                    </FormGroup>
                )}
            </Box>
        </>
    );
}
