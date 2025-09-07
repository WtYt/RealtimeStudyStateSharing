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

/**
 * ルーム名検索
 * - name: 検索語
 * - opts: { idToken?: string }  // 認証トークンを渡すと Authorization: Bearer が付く
 * 戻り値: 知らない
 */

/**
 * カテゴリ検索
 * - categoryInt: カテゴリを表す数値（categories.json の key）
 * - opts: { idToken?: string }
 * 戻り値: 知らない
 */
import { listRooms as demoList, searchRoomsByName as demoSearchByName, searchRoomsByCategory as demoSearchByCategory } from './demoBackend';

export async function listRooms({ idToken } = {}) {
    return demoList();
}

export async function searchRoomsByName(name, { idToken } = {}) {
    return demoSearchByName(name);
}

export async function searchRoomsByCategory(categoryInt, { idToken } = {}) {
    return demoSearchByCategory(categoryInt);
}