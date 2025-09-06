export const createUser = async (email, nickname) => {
  try {
    var date = new Date();
    const response = await fetch('http://127.0.0.1:5000/db/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collection: 'users',
        data: {
          comment: '',
          createdAt: date.toGMTString(),
          favorite_rooms_all: [],
          favorite_rooms_visible: [],
          name: nickname,
          profile_pic_path: '',
          room_search_history: [],
          status: 0,
          updatedAt: date.toGMTString(),
          user_id: email,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`サーバーエラー: ${response.status}`);
    }

    const result = await response.json();
    console.log('ユーザー作成結果:', result);
  } catch (error) {
    console.error('エラー:', error);
  }
};
