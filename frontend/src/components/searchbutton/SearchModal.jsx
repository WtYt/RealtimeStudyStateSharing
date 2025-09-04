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

    const [tab, setTab] = useState('name');
    const [inputName, setInputName] = useState('');
    const [selectedKey, setSelectedKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!opened) return;
        setTab('name'); setInputName(''); setSelectedKey('');
        setResults([]); setError(''); setLoading(false);
    }, [opened]);

    const handleSearchByName = async () => {
        setLoading(true); setError(''); setResults([]);
        try {
            const data = await onSearchByName(String(inputName).trim());
            setResults(Array.isArray(data) ? data : []);
        } catch { setError('検索に失敗しました'); }
        finally { setLoading(false); }
    };

    const handleSearchByCategory = async () => {
        setLoading(true); setError(''); setResults([]);
        try {
            const data = await onSearchByCategory(selectedKey);
            setResults(Array.isArray(data) ? data : []);
        } catch { setError('検索に失敗しました'); }
        finally { setLoading(false); }
    };

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