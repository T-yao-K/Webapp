import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [novels, setNovels] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [genreName, setGenreName] = useState('');

  const fetchQuizData = async () => {
    setLoading(true);
    setError('');
    setResult('');
    try {
      const response = await fetch('http://localhost:8000/quiz');
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setNovels(data.novels);
      setGenreName(data.genre_name);
      setCurrentQuestionIndex(0);
      setNewQuestion(data.novels, 0);
    } catch (error) {
      setError('クイズデータの取得に失敗しました: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const setNewQuestion = (novelsData, index) => {
    const currentNovel = novelsData[index];
    const otherNovels = novelsData.filter((_, idx) => idx !== index);
    const randomNovels = otherNovels.sort(() => 0.5 - Math.random()).slice(0, 2);
    setOptions([currentNovel, ...randomNovels].sort(() => 0.5 - Math.random()));
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  const handleAnswer = (selectedNcode) => {
    const currentNovel = novels[currentQuestionIndex];
    if (selectedNcode === currentNovel.ncode) {
      setResult('正解！');
    } else {
      setResult('不正解... もう一度選んでください。');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < novels.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setNewQuestion(novels, nextIndex);
      setResult('');
    } else {
      fetchQuizData(); // すべての問題を使い切ったら新しい問題セットを取得
    }
  };

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;
  if (novels.length === 0) return null;

  const currentNovel = novels[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2>小説クイズ</h2>
      <p className="genre">ジャンル: {genreName}</p>
      <p className="story">{currentNovel.story}</p>
      <div className="options">
        {options.map((option) => (
          <button
            key={option.ncode}
            onClick={() => handleAnswer(option.ncode)}
            disabled={result === '正解！'}
          >
            {option.title}
          </button>
        ))}
      </div>
      {result && (
        <div className="result">
          <p>{result}</p>
          {result === '正解！' && (
            <>
              <button onClick={handleNextQuestion}>次の問題</button>
              <a href={currentNovel.url} target="_blank" rel="noopener noreferrer">
                <button>この小説を読む</button>
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;