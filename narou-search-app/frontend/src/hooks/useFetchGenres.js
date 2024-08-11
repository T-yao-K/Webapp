import { useState, useEffect } from 'react';

const useFetchGenres = () => {
  const [genres, setGenres] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const response = await fetch(`${backendUrl}/genres`);
        if (!response.ok) {
          throw new Error('Failed to fetch genres');
        }
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error('Error fetching genres:', error);
        setError('ジャンル一覧の取得に失敗しました');
      }
    };

    fetchGenres();
  }, []);

  return { genres, error };
};

export default useFetchGenres;