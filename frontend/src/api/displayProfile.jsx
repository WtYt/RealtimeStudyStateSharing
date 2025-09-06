import { useState, useEffect } from 'react';

export const useDisplayProfile = (user) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      'http://127.0.0.1:5000/db/read?collection=users&doc_id=dummy1_offline_user'
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error('エラー:', error));
  }, []);

  return data;
};
