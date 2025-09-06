// 以下はバックで未実装なエンドポイント
// room/search/?name=...
// room/search/?category=...
// ゲットでなにを返してくれるか聞いたらうまいことやる

const API_BASE = 'http://127.0.0.1:5000';

/**
 * 共通 fetch ヘルパー
 * - path: '/room/search' など（先頭スラッシュあり）
 * - params: オブジェクト -> クエリ文字列
 * - options: fetch の追加オプション（例: headers）
 */
async function fetchJson(path, params = {}, options = {}) {
    const url = `${API_BASE}${path}${Object.keys(params).length ? `?${new URLSearchParams(params)}` : ''}`;
    const res = await fetch(url, { method: 'GET', ...options });
    if (res.status === 404) return null;
    if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`fetch ${url} failed: ${res.status} ${txt}`);
    }
    return res.json().catch(() => null);
}

/**
 * ルーム名検索
 * - name: 検索語
 * - opts: { idToken?: string }  // 認証トークンを渡すと Authorization: Bearer が付く
 * 戻り値: 知らない
 */
export async function searchRoomsByName(name, { idToken } = {}) {
    if (!name || String(name).trim() === '') return [];
    const params = { name: String(name).trim() };
    const headers = { Accept: 'application/json' };
    if (idToken) headers.Authorization = `Bearer ${idToken}`;

    // 標準: /room/search?name=... を呼ぶ（バックに合わせて変更可）
    const data = await fetchJson('/room/search', params, { headers });
    if (data === null) return [];
    if (!Array.isArray(data)) {
        // 予備: 一部バックエンドが別エンドポイントを使っている場合のフォールバック
        const fallback = await fetchJson('/rooms', params, { headers });
        return Array.isArray(fallback) ? fallback : [];
    }
    return data;
}

/**
 * カテゴリ検索
 * - categoryInt: カテゴリを表す数値（categories.json の key）
 * - opts: { idToken?: string }
 * 戻り値: 知らない
 */
export async function searchRoomsByCategory(categoryInt, { idToken } = {}) {
    if (categoryInt === undefined || categoryInt === null) return [];
    const params = { category: String(categoryInt) };
    const headers = { Accept: 'application/json' };
    if (idToken) headers.Authorization = `Bearer ${idToken}`;

    // 標準: /room/search?category=... を呼ぶ
    const data = await fetchJson('/room/search', params, { headers });
    if (data === null) return [];
    if (!Array.isArray(data)) {
        // fallback
        const fallback = await fetchJson('/rooms', params, { headers });
        return Array.isArray(fallback) ? fallback : [];
    }
    return data;
}