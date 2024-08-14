import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      setQuizData(data);
    } catch (error) {
      setError('クイズデータの取得に失敗しました: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  const handleAnswer = (selectedNcode) => {
    if (selectedNcode === quizData.correct_ncode) {
      setResult('正解！');
    } else {
      setResult('不正解...');
    }
  };

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;
  if (!quizData) return null;

  return (
    <div className="quiz-container">
      <h2>小説クイズ</h2>
      <p className="story">{quizData.question}</p>
      <div className="options">
        {quizData.options.map((option) => (
          <button
            key={option.ncode}
            onClick={() => handleAnswer(option.ncode)}
            disabled={result !== ''}
          >
            {option.title}
          </button>
        ))}
      </div>
      {result && (
        <div className="result">
          <p>{result}</p>
          {result === '正解！' && (
            <button onClick={fetchQuizData}>次の問題</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;