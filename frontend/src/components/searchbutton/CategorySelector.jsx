import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

/**
 * props:
 * - categories: Array<{ key: string, label: string }>
 * - value: string            // 選択中の key
 * - onChange: (key: string) => void
 * - label?: string
 */
export default function CategorySelector({
    categories = [],
    value = '',
    onChange,
    label = 'カテゴリ',
}) {
    return (
        <FormControl fullWidth>
            <InputLabel id="category-select-label">{label}</InputLabel>
            <Select
                labelId="category-select-label"
                label={label}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
            >
                {categories.map(({ key, label }) => (
                    <MenuItem key={key} value={key}>
                        {label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
