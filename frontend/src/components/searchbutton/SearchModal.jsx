import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import {
    Box, Button, Stack, Typography, TextField, Divider, Tabs, Tab,
} from '@mui/material';
import ResultsList from './ResultsList';
import CategorySelector from './CategorySelector';

const SearchPopupContext = createContext({ open: () => { }, close: () => { } });
export function useSearchPopup() {
    return useContext(SearchPopupContext);
}

export default function SearchPopupProvider({
    children,
    categories = [],
    onSearchByName,
    onSearchByCategory,
    onRoomClick,
}) {
    const [opened, setOpened] = useState(false);
    const open = useCallback(() => setOpened(true), []);
    const close = useCallback(() => setOpened(false), []);

    const [tab, setTab] = useState('name'); // 'name' | 'category'
    const [inputName, setInputName] = useState(''); // 検索ワード
    const [selectedKey, setSelectedKey] = useState(''); // 選択中のカテゴリ key
    const [loading, setLoading] = useState(false); // 検索中フラグ
    const [results, setResults] = useState([]); // 検索結果
    const [error, setError] = useState(''); // エラーメッセージ

    // モーダルを開いたときに状態をリセット
    useEffect(() => {
        if (!opened) return;
        setTab('name'); setInputName(''); setSelectedKey('');
        setResults([]); setError(''); setLoading(false);
    }, [opened]);

    // 名前検索
    const handleSearchByName = async () => {
        setLoading(true); setError(''); setResults([]);
        try {
            const data = await onSearchByName(String(inputName).trim());
            setResults(Array.isArray(data) ? data : []);
        } catch { setError('検索に失敗しました'); }
        finally { setLoading(false); }
    };

    // カテゴリ検索
    const handleSearchByCategory = async () => {
        setLoading(true); setError(''); setResults([]);
        try {
            const data = await onSearchByCategory(selectedKey);
            setResults(Array.isArray(data) ? data : []);
        } catch { setError('検索に失敗しました'); }
        finally { setLoading(false); }
    };

    // ルーム名クリック時にonRoomClickを呼ぶ
    const handleRoomClick = (room) => {
        if (typeof onRoomClick === 'function') onRoomClick(room);
    };

    const ctx = useMemo(() => ({ open, close }), [open, close]);

    return (
        <SearchPopupContext.Provider value={ctx}>
            {children}
        </SearchPopupContext.Provider>
    );
}