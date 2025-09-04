import React from 'react';
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';

export default function CategorySelector({ categories = [], checked, setChecked }) {
    // checked: string (単一選択)
    const handleChange = (event) => {
        setChecked(event.target.value);
    };

    return (
        <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                カテゴリを選択してください
            </Typography>
            <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1, height: 180, width: 220, overflowY: 'auto', overflowX: 'hidden', background: '#fafcff' }}>
                {categories.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        カテゴリが設定されていません
                    </Typography>
                ) : (
                    <FormControl component="fieldset" fullWidth>
                        <RadioGroup value={checked} onChange={handleChange}>
                            {categories.map(({ key, label }) => (
                                <FormControlLabel
                                    key={key}
                                    value={key}
                                    control={<Radio />}
                                    label={label}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                )}
            </Box>
        </>
    );
}
