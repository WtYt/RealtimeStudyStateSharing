import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import categories from '../categories.json';
/**
 * props:
 * - categories: Array<{ key: string, label: string }> <-keyってstringじゃなくてintか？
 * - value: string            // 選択中の key 
 * - onChange: (key: string) => void
 * - label?: string
 */
export default function CategorySelector({
  categories= [],
  value='',
  onChange,
  label = 'カテゴリー',
}) {
  const items = (categories || []).filter((c) => Number(c.key) !== 0);
  return (
    <FormControl fullWidth>
      <InputLabel id="category-select-label">{label}</InputLabel>
      <Select
        labelId="category-select-label"
        label={label}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {items.map(({ key, label }) => (
          <MenuItem key={key} value={key}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
