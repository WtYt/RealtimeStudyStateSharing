import { getCurrentUserUid } from './auth';

export const createRoom = async (roomName, selectedCategory) => {
  try {
    const uid = getCurrentUserUid();
    const response = await fetch('http://127.0.0.1:5000/db/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collection: 'rooms',
        data: {
          name: roomName,
          in_room_users: [uid.toString()],
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
