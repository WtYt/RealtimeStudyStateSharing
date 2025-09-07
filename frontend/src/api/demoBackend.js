// Demo in-memory backend for local UI demo
const LS_CURRENT_ROOM = 'demo_currentRoomId';

const demoData = {
    rooms: [
        {
            id: 'room1',
            name: 'プログラミング部屋',
            category: 1,
            members: [
                { id: 'u_demo_1', name: 'Alice', status: 2, comment: 'アルゴリズム練習中' },
                { id: 'u_demo_2', name: 'Bob', status: 1, comment: 'コードレビュー待ち' },
                { id: 'u_demo_13', name: 'Mika', status: 0, comment: '' },
                { id: 'u_demo_14', name: 'Taro', status: 2, comment: 'Webフロント学習' },
                { id: 'u_demo_26', name: 'Yui', status: 1, comment: 'React Hooks を学習中' },
                { id: 'u_demo_27', name: 'Kenji', status: 2, comment: 'アルゴリズム模試' },
            ],
        },
        {
            id: 'room2',
            name: '数学カフェ',
            category: 2,
            members: [
                { id: 'u_demo_3', name: 'Charlie', status: 2, comment: '解析問題に取り組み中' },
                { id: 'u_demo_4', name: 'Diana', status: 1, comment: '復習メイン' },
                { id: 'u_demo_28', name: 'Sota', status: 0, comment: '' },
                { id: 'u_demo_29', name: 'Momo', status: 1, comment: '確率の練習' },
            ],
        },
        {
            id: 'room3',
            name: '英語トーク',
            category: 3,
            members: [
                { id: 'u_demo_5', name: 'Ethan', status: 1, comment: '発音練習中' },
                { id: 'u_demo_6', name: 'Fiona', status: 0, comment: '' },
                { id: 'u_demo_30', name: 'Liam', status: 2, comment: '会話練習' },
            ],
        },
        {
            id: 'room4',
            name: 'データサイエンス',
            category: 1,
            members: [
                { id: 'u_demo_7', name: 'George', status: 2, comment: 'Pandasチュートリアル' },
                { id: 'u_demo_8', name: 'Hana', status: 1, comment: 'データ可視化' },
                { id: 'u_demo_9', name: 'Isaac', status: 0, comment: '' },
                { id: 'u_demo_31', name: 'Mai', status: 2, comment: '機械学習入門' },
                { id: 'u_demo_32', name: 'Riku', status: 1, comment: '前処理の練習' },
            ],
        },
        {
            id: 'room5',
            name: '統計入門グループ',
            category: 2,
            members: [
                { id: 'u_demo_10', name: 'Jasmine', status: 1, comment: '基礎問題の復習' },
                { id: 'u_demo_33', name: 'Saki', status: 0, comment: '' },
            ],
        },
        {
            id: 'room6',
            name: 'TOEIC対策',
            category: 3,
            members: [
                { id: 'u_demo_11', name: 'Ken', status: 2, comment: '模試に挑戦中' },
                { id: 'u_demo_12', name: 'Luna', status: 1, comment: '語彙強化' },
                { id: 'u_demo_15', name: 'Nao', status: 0, comment: '' },
                { id: 'u_demo_16', name: 'Omar', status: 2, comment: 'リスニング中心' },
                { id: 'u_demo_34', name: 'Hiro', status: 1, comment: '長文読解' },
                { id: 'u_demo_35', name: 'Aki', status: 2, comment: 'シャドーイング' },
            ],
        },
        {
            id: 'room7',
            name: '機械学習勉強会',
            category: 1,
            members: [
                { id: 'u_demo_17', name: 'Pia', status: 2, comment: 'モデル評価を実行中' },
                { id: 'u_demo_18', name: 'Quinn', status: 1, comment: '論文サーベイ' },
                { id: 'u_demo_19', name: 'Ryo', status: 1, comment: '実装補助' },
                { id: 'u_demo_20', name: 'Sara', status: 0, comment: '' },
                { id: 'u_demo_36', name: 'Jun', status: 2, comment: 'ハイパラ調整' },
            ],
        },
        {
            id: 'room8',
            name: '歴史カフェ',
            category: 4,
            members: [
                { id: 'u_demo_21', name: 'Tom', status: 1, comment: '幕末史のまとめ' },
                { id: 'u_demo_22', name: 'Umi', status: 0, comment: '' },
                { id: 'u_demo_37', name: 'Aya', status: 1, comment: '古文書の翻刻' },
            ],
        },
        {
            id: 'room9',
            name: '短歌・俳句サークル',
            category: 5,
            members: [
                { id: 'u_demo_38', name: 'Kou', status: 1, comment: '季語の研究' },
            ],
        },
        {
            id: 'room10',
            name: 'ハッカソンチームA',
            category: 1,
            members: [
                { id: 'u_demo_23', name: 'Viktor', status: 2, comment: 'プロトタイプ作成中' },
                { id: 'u_demo_24', name: 'Wakana', status: 1, comment: 'UI設計' },
                { id: 'u_demo_25', name: 'Xiang', status: 1, comment: 'API実装' },
                { id: 'u_demo_39', name: 'Yosh', status: 2, comment: 'CI整備' },
                { id: 'u_demo_40', name: 'Zoe', status: 1, comment: 'デプロイ検証' },
            ],
        },
    ],
    demoUser: { id: 'me_demo', name: 'Me', status: 2, comment: 'デモ' },
};

let rooms = demoData.rooms.map((r) => ({ ...r, members: Array.isArray(r.members) ? r.members.slice() : [] }));
const demoUser = demoData.demoUser;

function findRoom(id) {
    return rooms.find((r) => String(r.id) === String(id)) || null;
}

export async function listRooms() {
    return rooms.map((r) => ({ id: r.id, name: r.name, category: r.category, memberCount: r.members.length, members: r.members.slice() }));
}

export async function searchRoomsByName(name) {
    if (!name || String(name).trim() === '') return [];
    const q = String(name).trim().toLowerCase();
    return rooms.filter((r) => r.name.toLowerCase().includes(q)).map((r) => ({ id: r.id, name: r.name, category: r.category, memberCount: r.members.length, members: r.members.slice() }));
}

export async function searchRoomsByCategory(categoryInt) {
    if (categoryInt === undefined || categoryInt === null) return [];
    const c = String(categoryInt);
    return rooms.filter((r) => String(r.category) === c).map((r) => ({ id: r.id, name: r.name, category: r.category, memberCount: r.members.length, members: r.members.slice() }));
}

export async function fetchRoomById(doc_id) {
    const r = findRoom(doc_id);
    if (!r) return null;
    return { doc_id: r.id, id: r.id, name: r.name, category: r.category, members: r.members.slice() };
}

export function getCurrentRoomId() {
    return localStorage.getItem(LS_CURRENT_ROOM) || null;
}

export async function enterRoom(roomId, { user = demoUser } = {}) {
    if (!roomId) throw new Error('missing roomId');
    const room = findRoom(roomId);
    if (!room) throw new Error('room not found');
    rooms.forEach((r) => { r.members = r.members.filter((m) => String(m.id) !== String(user.id)); });
    if (!room.members.some((m) => String(m.id) === String(user.id))) {
        // preserve status/comment if provided on user param
        room.members.push({ id: user.id, name: user.name, status: user.status ?? 0, comment: user.comment ?? '' });
    }
    localStorage.setItem(LS_CURRENT_ROOM, String(roomId));
    // notify listeners in same window
    try {
        window.dispatchEvent(new CustomEvent('demoCurrentRoomChanged', { detail: String(roomId) }));
    } catch (e) {
        // ignore in non-browser env
    }
    return true;
}

export async function leaveRoom(roomId, { user = demoUser } = {}) {
    if (!roomId) return false;
    const room = findRoom(roomId);
    if (!room) return false;
    room.members = room.members.filter((m) => String(m.id) !== String(user.id));
    const cur = getCurrentRoomId();
    if (String(cur) === String(roomId)) localStorage.removeItem(LS_CURRENT_ROOM);
    try {
        window.dispatchEvent(new CustomEvent('demoCurrentRoomChanged', { detail: null }));
    } catch (e) {
        // ignore
    }
    return true;
}

export async function leaveCurrentRoom({ user = demoUser } = {}) {
    const cur = getCurrentRoomId();
    if (!cur) return false;
    return leaveRoom(cur, { user });
}
