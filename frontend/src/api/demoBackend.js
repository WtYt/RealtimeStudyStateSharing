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
                { id: 'u_demo_13', name: 'Mika', status: 1, comment: 'WEBバックエンド学習' },
                { id: 'u_demo_14', name: 'Taro', status: 2, comment: 'Webフロントエンド学習' },
                { id: 'u_demo_26', name: 'Yui', status: 1, comment: 'React Hooks を学習中' },
                { id: 'u_demo_27', name: 'Kenji', status: 2, comment: 'AtCoder参加中' },
                { id: 'u_demo_41', name: 'Sora', status: 2, comment: 'ユニットテスト整備' },
                { id: 'u_demo_42', name: 'Nana', status: 1, comment: 'UI改善中' },
                { id: 'u_demo_43', name: 'Rin', status: 2, comment: 'パフォーマンスチューニング' },
                { id: 'u_demo_44', name: 'Sho', status: 1, comment: 'ドキュメント作成' },
            ],
        },
        {
            id: 'room2',
            name: '数学カフェ',
            category: 2,
            members: [
                { id: 'u_demo_3', name: 'Charlie', status: 2, comment: '解析学に取り組み中' },
                { id: 'u_demo_4', name: 'Diana', status: 1, comment: '復習メイン' },
                { id: 'u_demo_28', name: 'Sota', status: 1, comment: '数学の基礎を復習中' },
                { id: 'u_demo_29', name: 'Momo', status: 1, comment: '確率の練習' },
                { id: 'u_demo_45', name: 'Kazu', status: 2, comment: '線形代数演習中' },
                { id: 'u_demo_46', name: 'Aya2', status: 1, comment: '数列の証明を確認' },
                { id: 'u_demo_47', name: 'Masu', status: 2, comment: '幾何の図を作成' },
                { id: 'u_demo_48', name: 'Hiro2', status: 1, comment: '計算練習中' },
                { id: 'u_demo_49', name: 'Emi', status: 2, comment: '問題解説担当' },
                { id: 'u_demo_80', name: 'Airi', status: 1, comment: '統計と解析の橋渡し中' },
            ],
        },
        {
            id: 'room3',
            name: '英語トーク',
            category: 3,
            members: [
                { id: 'u_demo_5', name: 'Ethan', status: 1, comment: '発音練習中' },
                { id: 'u_demo_30', name: 'Liam', status: 2, comment: '会話練習' },
                { id: 'u_demo_50', name: 'Mina', status: 2, comment: 'リスニング強化' },
                { id: 'u_demo_51', name: 'Noa2', status: 1, comment: '語彙を増やす' },
                { id: 'u_demo_52', name: 'Kai', status: 2, comment: '英作文の添削' },
                { id: 'u_demo_53', name: 'Sara2', status: 1, comment: '発表準備' },
                { id: 'u_demo_54', name: 'Ben2', status: 2, comment: 'フリートーク練習' },
                { id: 'u_demo_55', name: 'Moe', status: 1, comment: '教材作成' },
                { id: 'u_demo_81', name: 'Rika', status: 2, comment: '発音教材を作成中' },
            ],
        },
        {
            id: 'room4',
            name: 'データサイエンス',
            category: 1,
            members: [
                { id: 'u_demo_7', name: 'George', status: 2, comment: 'Pandasチュートリアル' },
                { id: 'u_demo_8', name: 'Hana', status: 1, comment: 'データ可視化' },
                { id: 'u_demo_31', name: 'Mai', status: 2, comment: '機械学習入門' },
                { id: 'u_demo_32', name: 'Riku', status: 1, comment: '前処理の練習' },
                { id: 'u_demo_56', name: 'Yosh2', status: 2, comment: 'モデル評価中' },
                { id: 'u_demo_57', name: 'Koe', status: 1, comment: 'EDA中' },
                { id: 'u_demo_58', name: 'Tom2', status: 2, comment: 'ハイパラ調整' },
                { id: 'u_demo_59', name: 'Rara', status: 1, comment: 'データ収集' },
                { id: 'u_demo_60', name: 'Ken2', status: 2, comment: '結果可視化' },
                { id: 'u_demo_82', name: 'Mitsu', status: 1, comment: '特徴量設計を検討中' },
            ],
        },
        {
            id: 'room5',
            name: '統計入門グループ',
            category: 2,
            members: [
                { id: 'u_demo_10', name: 'Jasmine', status: 1, comment: '基礎問題の復習' },
                { id: 'u_demo_33', name: 'Saki', status: 1, comment: '分布を学習' },
                { id: 'u_demo_61', name: 'Nori', status: 2, comment: '統計ソフト操作' },
                { id: 'u_demo_62', name: 'Rie', status: 1, comment: '検定を学ぶ' },
                { id: 'u_demo_63', name: 'Toshi', status: 2, comment: '回帰分析練習' },
                { id: 'u_demo_64', name: 'Yuka', status: 1, comment: 'グラフ作成' },
                { id: 'u_demo_65', name: 'Kimi', status: 2, comment: '実験計画' },
                { id: 'u_demo_83', name: 'Miki', status: 1, comment: 'サンプル抽出を確認' },
                { id: 'u_demo_84', name: 'Hiro3', status: 2, comment: '統計理論を整理' },
            ],
        },
        {
            id: 'room6',
            name: 'TOEIC対策',
            category: 3,
            members: [
                { id: 'u_demo_11', name: 'Ken', status: 2, comment: '模試に挑戦中' },
                { id: 'u_demo_12', name: 'Luna', status: 1, comment: '語彙強化' },
                { id: 'u_demo_16', name: 'Omar', status: 2, comment: 'リスニング中心' },
                { id: 'u_demo_34', name: 'Hiro', status: 1, comment: '長文読解' },
                { id: 'u_demo_35', name: 'Aki', status: 2, comment: 'シャドーイング' },
                { id: 'u_demo_66', name: 'Maki', status: 1, comment: '時短対策' },
                { id: 'u_demo_67', name: 'Suzu', status: 2, comment: 'パート別演習' },
                { id: 'u_demo_68', name: 'Ryo2', status: 1, comment: '苦手強化' },
                { id: 'u_demo_85', name: 'Eri', status: 2, comment: 'スコア目標設定中' },
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
                { id: 'u_demo_36', name: 'Jun', status: 2, comment: 'ハイパラ調整' },
                { id: 'u_demo_69', name: 'Nao2', status: 2, comment: 'データ拡張試行' },
                { id: 'u_demo_70', name: 'Hana2', status: 1, comment: '転移学習検討' },
                { id: 'u_demo_71', name: 'Yuto', status: 2, comment: '分散学習検証' },
                { id: 'u_demo_72', name: 'Mika2', status: 1, comment: '実験ログ整理' },
                { id: 'u_demo_86', name: 'Nao3', status: 2, comment: '評価指標検討中' },
            ],
        },
        {
            id: 'room8',
            name: '歴史カフェ',
            category: 4,
            members: [
                { id: 'u_demo_21', name: 'Tom', status: 1, comment: '幕末史のまとめ' },
                { id: 'u_demo_37', name: 'Aya', status: 1, comment: '古文書の翻刻' },
                { id: 'u_demo_73', name: 'Kei', status: 2, comment: '時代背景整理' },
                { id: 'u_demo_74', name: 'Nobu', status: 2, comment: '出典調査' },
                { id: 'u_demo_87', name: 'Mao', status: 1, comment: '史料比較中' },
                { id: 'u_demo_88', name: 'Rei', status: 2, comment: '地図作成' },
                { id: 'u_demo_89', name: 'Suzu2', status: 1, comment: '系譜整理' },
            ],
        },
        {
            id: 'room9',
            name: '短歌・俳句サークル',
            category: 5,
            members: [
                { id: 'u_demo_38', name: 'Kou', status: 1, comment: '季語の研究' },
                { id: 'u_demo_75', name: 'Ruka', status: 2, comment: '作品添削' },
                { id: 'u_demo_76', name: 'Sena', status: 1, comment: '詠み練習' },
                { id: 'u_demo_90', name: 'Hana3', status: 2, comment: '短歌アイデア出し' },
                { id: 'u_demo_91', name: 'Iori', status: 1, comment: '季語収集' },
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
                { id: 'u_demo_77', name: 'Aoi', status: 2, comment: 'インフラ対応' },
                { id: 'u_demo_78', name: 'Sho2', status: 1, comment: 'UX改善' },
                { id: 'u_demo_79', name: 'Taku', status: 2, comment: 'パフォーマンス最適化' },
                { id: 'u_demo_92', name: 'Momo2', status: 1, comment: 'ドキュメント補強' },
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
        room.members.push({ id: user.id, name: user.name, status: user.status ?? 1, comment: user.comment ?? '参加中' });
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
