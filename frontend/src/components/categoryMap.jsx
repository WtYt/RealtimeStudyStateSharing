// categoryの辞書

import categories from '../components/categories.json';

// int → label
export const CATEGORY_INT_TO_LABEL = Object.fromEntries(
    categories.map(c => [c.key, c.label])
);

// int → key (intそのままだけど安全のため)
export const CATEGORY_INT_KEYS = categories.map(c => c.key);

// UI用にそのまま渡せる
export { categories };
