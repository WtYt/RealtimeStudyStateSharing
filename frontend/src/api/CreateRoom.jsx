import { getCurrentUserUid } from './auth';
// ユーザー情報取得用
async function getUserProfile(uid) {
  const res = await fetch(
    `http://127.0.0.1:5000/db/read?collection=users&doc_id=${uid}`
  );
  if (!res.ok) throw new Error('ユーザープロフィール取得失敗');
  const json = await res.json();
  return json.data || {};
}

export const createRoom = async (roomName, selectedCategory) => {
  try {
    const uid = getCurrentUserUid();
    const userProfile = await getUserProfile(uid);
    const member = {
      id: uid,
      name: userProfile.name,
      icon: userProfile.profile_pic_path,
      status: userProfile.status,
      comment: userProfile.comment,
    };
    const response = await fetch('http://127.0.0.1:5000/db/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collection: 'rooms',
        data: {
          name: roomName,
          in_room_users: [member],
          category: selectedCategory,
        },
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to create room');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
};
