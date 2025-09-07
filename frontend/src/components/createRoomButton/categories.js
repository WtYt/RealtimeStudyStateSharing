// categories.json を読み込み、CreateRoom 側で使いやすい形に正規化してエクスポートします
import categoriesJson from '../../components/categories.json';

const normalized = (Array.isArray(categoriesJson) ? categoriesJson : []).map(c => ({
  key: String(c.key ?? c.id ?? c.value ?? ''),
  label: c.label ?? c.name ?? String(c.key ?? c.id ?? c.value ?? '')
}));

export const categories = normalized;
export default normalized;
