// src/api/RoomSearch.js もしくは rooms.js
const API_BASE = 'http://localhost:5000';

// ルーム名検索
export async function searchRoomsByName(name) {
    const res = await fetch(`${API_BASE}/db/search?collection=rooms&roomname=${encodeURIComponent(name)}`);
    if (!res.ok) throw new Error('searchRoomsByName failed');
    return res.json(); // 実返却形に合わせて後で normalize
}

// カテゴリ検索（数値を送る想定）
export async function searchRoomsByCategory(categoryInt) {
    const res = await fetch(`${API_BASE}/db/search?collection=rooms&category=${encodeURIComponent(categoryInt)}`);
    if (!res.ok) throw new Error('searchRoomsByCategory failed');
    return res.json();
}