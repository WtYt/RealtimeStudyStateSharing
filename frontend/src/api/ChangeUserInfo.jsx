import { getCurrentUserUid } from './auth';

export const commentEdit = async (newContent) => {
  try {
    const docId = getCurrentUserUid();
    const response = await fetch(`http://127.0.0.1:5000/db/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collection: 'users',
        doc_id: docId,
        data: {
          comment: newContent,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`サーバーエラー: ${response.status}`);
    }

    const result = await response.json();
    console.log('コメント編集結果:', result);
  } catch (error) {
    console.error('エラー:', error);
  }
};

export const iconEdit = async (newIconFile) => {
  try {
    const docId = getCurrentUserUid();
    const response = await fetch(`http://127.0.0.1:5000/db/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collection: 'users',
        doc_id: docId,
        data: {
          profile_pic_path: newIconFile,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`サーバーエラー: ${response.status}`);
    }

    const result = await response.json();
    console.log('アイコン編集結果:', result);
  } catch (error) {
    console.error('エラー:', error);
  }
};

export const nameEdit = async (newName) => {
  try {
    const docId = getCurrentUserUid();
    const response = await fetch(`http://127.0.0.1:5000/db/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collection: 'users',
        doc_id: docId,
        data: {
          name: newName,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`サーバーエラー: ${response.status}`);
    }

    const result = await response.json();
    console.log('名前編集結果:', result);
  } catch (error) {
    console.error('エラー:', error);
  }
};
