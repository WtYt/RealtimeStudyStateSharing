import React, { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import {
    Box, Button, Stack, Typography, TextField, Divider,
    Tabs, Tab,
} from '@mui/material';
import CategorySelector from './CategorySelector';
import ResultsList from './ResultsList';

// react-modal の配置スタイル
const modalStyles = {
    overlay: { backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 1300 },
    content: {
        inset: '50% auto auto 50%',
        transform: 'translate(-50%, -50%)',
        padding: 0, border: 'none', background: 'transparent',
    },
};

// ★スタブ：将来 API を呼ぶ関数に差し替える
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function stubSearchById(/* id */) { await sleep(200); return []; }
async function stubSearchByCategories(/* keys */) { await sleep(200); return []; }

export default function SearchModal({
    open, onClose,
    categories = [],
}) {
    const [tab, setTab] = useState('id'); // 'id' | 'category'
    const [inputId, setInputId] = useState('');
    const [checked, setChecked] = useState(() => new Set());
    const checkedArray = useMemo(() => Array.from(checked), [checked]);

    // 結果・状態
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]); // [{ id, name, categories, memberCount }]
    const [error, setError] = useState('');

    // 開くたび初期化
    useEffect(() => {
        if (!open) return;
        setTab('id'); setInputId(''); setChecked(new Set());
        setResults([]); setError(''); setLoading(false);
    }, [open]);

    // 検索（いまはスタブ。あとでAPI呼び出しに差し替え）
    const searchById = async (id) => {
        setLoading(true); setError(''); setResults([]);
        try {
            const data = await stubSearchById(String(id).trim());
            setResults(Array.isArray(data) ? data : []);
        } catch {
            setError('検索に失敗しました');
        } finally { setLoading(false); }
    };

    const searchByCategories = async (keys) => {
        setLoading(true); setError(''); setResults([]);
        try {
            const data = await stubSearchByCategories(keys);
            setResults(Array.isArray(data) ? data : []);
        } catch {
            setError('検索に失敗しました');
        } finally { setLoading(false); }
    };

    return (
        <Modal
            isOpen={open}
            onRequestClose={onClose}
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
            style={modalStyles}
            contentLabel="検索モーダル"
        >
            <Box sx={{ width: 520, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 10, p: 2.5 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="h6">ルーム検索</Typography>
                    <Button onClick={onClose}>閉じる</Button>
                </Stack>

                <Tabs value={tab} onChange={(_, v) => { setTab(v); setResults([]); setError(''); }} sx={{ mb: 2 }}>
                    <Tab label="ルームID検索" value="id" />
                    <Tab label="ルームカテゴリ検索" value="category" />
                </Tabs>

                {tab === 'id' && (
                    <>
                        <Stack direction="row" spacing={1}>
                            <TextField
                                label="ルームID（完全一致）"
                                value={inputId}
                                onChange={(e) => setInputId(e.target.value)}
                                fullWidth
                                autoFocus
                            />
                            <Button
                                variant="contained"
                                onClick={() => searchById(inputId)}
                                disabled={!String(inputId).trim()}
                            >
                                検索
                            </Button>
                        </Stack>

                        <Divider sx={{ my: 2 }} />
                        <ResultsList loading={loading} error={error} results={results} />
                    </>
                )}

                {tab === 'category' && (
                    <>
                        <CategorySelector categories={categories} checked={checked} setChecked={setChecked} />
                        <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 1.5 }}>
                            <Button onClick={() => { setChecked(new Set()); setResults([]); setError(''); }}>
                                リセット
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => searchByCategories(checkedArray)}
                                disabled={checked.size === 0}
                            >
                                検索
                            </Button>
                        </Stack>

                        <Divider sx={{ my: 2 }} />
                        <ResultsList loading={loading} error={error} results={results} />
                    </>
                )}
            </Box>
        </Modal>
    );
}
