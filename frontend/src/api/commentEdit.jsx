export const commentEdit = async (newContent) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/db/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collection: 'users',
        doc_id: 'OAV2Vbpi4nCdG1b1GNjZ',
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
