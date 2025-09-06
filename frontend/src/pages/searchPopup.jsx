import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Modal from 'react-modal';
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  Divider,
  Tabs,
  Tab,
} from '@mui/material';
import CategorySelector from '../components/searchbutton/CategorySelector';
import ResultsList from '../components/searchbutton/ResultsList';

// react-modal の初期化：アプリ起動時にどこかで一度だけ（重複OKガード付）
Modal.setAppElement?.('#root');

const modalStyles = {
  overlay: { backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 1300 },
  content: {
    inset: '50% auto auto 50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
    background: 'transparent',
  },
};

// --- スタブ（API未接続でも動く） --- i.e. API連携ができたら削除
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function stubSearchByName() {
  await sleep(200);
  return [];
}
async function stubSearchByCategory() {
  await sleep(200);
  return [];
}

// --- Context / Hook ---
const SearchPopupContext = createContext({ open: () => {}, close: () => {} });
export function useSearchPopup() {
  return useContext(SearchPopupContext);
}

/**
 * Provider props:
 * - categories: Array<{ key: string, label: string }>
 * - onSearchByName?: (name: string) => Promise<Room[]>
 * - onSearchByCategory?: (key: string) => Promise<Room[]>
 * - onRoomClick?: (room: Room) => void  // ルーム名クリック時（join拡張ポイント）
 *
 * Room = { id: string, name: string, category?: string, memberCount?: number }
 */
export default function SearchPopupProvider({
  children,
  categories = [],
  onSearchByName,
  onSearchByCategory,
  onRoomClick,
}) {
  // 開閉
  const [opened, setOpened] = useState(false);
  const open = useCallback(() => setOpened(true), []);
  const close = useCallback(() => setOpened(false), []);

  // 検索UI状態
  const [tab, setTab] = useState('name'); // 'name' | 'category'
  const [inputName, setInputName] = useState('');
  const [selectedKey, setSelectedKey] = useState('');

  // 結果状態
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]); // [{id,name,category,memberCount}]
  const [error, setError] = useState('');

  // 開くたび初期化
  useEffect(() => {
    if (!opened) return;
    setTab('name');
    setInputName('');
    setSelectedKey('');
    setResults([]);
    setError('');
    setLoading(false);
  }, [opened]);

  // 実行ハンドラ（props優先→未指定はスタブ） API連携ができたら stubSearchBy～ は削除しonSearchBy～に置き換える
  const doSearchByName = onSearchByName || stubSearchByName;
  const doSearchByCategory = onSearchByCategory || stubSearchByCategory;

  const handleSearchByName = async () => {
    setLoading(true);
    setError('');
    setResults([]);
    try {
      const data = await doSearchByName(String(inputName).trim());
      setResults(Array.isArray(data) ? data : []);
    } catch {
      setError('検索に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchByCategory = async () => {
    setLoading(true);
    setError('');
    setResults([]);
    try {
      const data = await doSearchByCategory(selectedKey);
      setResults(Array.isArray(data) ? data : []);
    } catch {
      setError('検索に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleRoomClick = (room) => {
    if (typeof onRoomClick === 'function') onRoomClick(room);
    else console.log('room clicked:', room);
  };

  const ctx = useMemo(() => ({ open, close }), [open, close]);

  return (
    <SearchPopupContext.Provider value={ctx}>
      {children}

      <Modal
        isOpen={opened}
        onRequestClose={close}
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        style={modalStyles}
        contentLabel="検索モーダル"
      >
        <Box
          sx={{
            width: 520,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 10,
            p: 2.5,
          }}
        >
          {/* ヘッダ */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1 }}
          >
            <Typography variant="h6">ルーム検索</Typography>
            <Button onClick={close}>閉じる</Button>
          </Stack>

          {/* タブ：ルーム名 / カテゴリ */}
          <Tabs
            value={tab}
            onChange={(_, v) => {
              setTab(v);
              setResults([]);
              setError('');
            }}
            sx={{ mb: 2 }}
          >
            <Tab label="ルーム名で検索" value="name" />
            <Tab label="カテゴリで検索" value="category" />
          </Tabs>

          {/* ルーム名検索 */}
          {tab === 'name' && (
            <>
              <Stack direction="row" spacing={1}>
                <TextField
                  label="ルーム名（部分一致）"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  fullWidth
                  autoFocus
                />
                <Button
                  variant="contained"
                  onClick={handleSearchByName}
                  disabled={!String(inputName).trim()}
                >
                  検索
                </Button>
              </Stack>

              <Divider sx={{ my: 2 }} />
              <ResultsList
                loading={loading}
                error={error}
                results={results}
                onRoomClick={handleRoomClick}
              />
            </>
          )}

          {/* カテゴリ検索（単一） */}
          {tab === 'category' && (
            <>
              <CategorySelector
                categories={categories}
                value={selectedKey}
                onChange={setSelectedKey}
                label="カテゴリ"
              />
              <Stack
                direction="row"
                spacing={1}
                justifyContent="flex-end"
                sx={{ mt: 1.5 }}
              >
                <Button
                  onClick={() => {
                    setSelectedKey('');
                    setResults([]);
                    setError('');
                  }}
                >
                  リセット
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSearchByCategory}
                  disabled={!selectedKey}
                >
                  検索
                </Button>
              </Stack>

              <Divider sx={{ my: 2 }} />
              <ResultsList
                loading={loading}
                error={error}
                results={results}
                onRoomClick={handleRoomClick}
              />
            </>
          )}
        </Box>
      </Modal>
    </SearchPopupContext.Provider>
  );
}
