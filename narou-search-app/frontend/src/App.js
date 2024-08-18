import React, { useState } from 'react';
import useFetchGenres from './hooks/useFetchGenres';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import Quiz from './components/Quiz'; // クイズコンポーネントをインポート
import Alert from '@mui/material/Alert'; // 修正: @mui/materialからインポート
import './App.css';

const App = () => {
  const [novels, setNovels] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [order, setOrder] = useState('');
  const [error, setError] = useState('');
  const { genres, error: genresError } = useFetchGenres();
  const [activeTab, setActiveTab] = useState('search'); // 追加: 現在のタブを管理する状態

  // 検索機能のハンドラー
  // const handleSearch = async (keyword) => {
  //   try {
  //     const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  //     const genreParam = selectedGenres.join('-');
  //     const response = await fetch(`${backendUrl}/search?keyword=${encodeURIComponent(keyword)}&genre=${genreParam}&order=${order}`);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     setNovels(data);
  //   } catch (error) {
  //     console.error('Error fetching novels:', error);
  //     setError(`小説の検索に失敗しました: ${error.message}`);
  //   }
  // };
  const handleSearch = async (keyword) => {
    setError(null);
    try {
      const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const genreParam = selectedGenres.join('-');
      const response = await fetch(`${backendUrl}/search?keyword=${encodeURIComponent(keyword)}&genre=${genreParam}&order=${order}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setNovels(data);
    } catch (error) {
      console.error('Error fetching novels:', error);
      setError('小説の検索に失敗しました');
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Narou Search App</h1>
        <nav>
          <ul>
            <li><a href="#search" onClick={() => setActiveTab('search')}>検索</a></li>
            <li><a href="#quiz" onClick={() => setActiveTab('quiz')}>クイズ</a></li>
          </ul>
        </nav>
      </header>
      <main>
        {genresError && <Alert severity="error" style={{ marginBottom: '20px' }}>{genresError}</Alert>}
        {error && <Alert severity="error" style={{ marginBottom: '20px' }}>{error}</Alert>}
        {activeTab === 'search' ? (
          <>
            <SearchForm
              onSearch={handleSearch}
              genres={genres}
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
              order={order}
              setOrder={setOrder}
            />
            <SearchResults novels={novels} genres={genres} />
          </>
        ) : (
          <Quiz /> // クイズコンポーネントを表示
        )}
      </main>
    </div>
  );
};

export default App;