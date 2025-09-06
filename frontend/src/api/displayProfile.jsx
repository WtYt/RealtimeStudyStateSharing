import { useState, useEffect } from 'react';
import { getCurrentUserUid } from './auth';

export const useDisplayProfile = (user) => {
  const [data, setData] = useState(null);
  const userId = getCurrentUserUid();

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/db/read?collection=users&doc_id=${userId}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error('エラー:', error));
  }, []);

  return data;
};
