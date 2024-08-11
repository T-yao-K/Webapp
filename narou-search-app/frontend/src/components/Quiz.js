import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      const response = await fetch('https://api.syosetu.com/novelapi/api/?out=json&lim=3');
      const data = await response.json();
      const correctNovel = data[1];
      const incorrectNovels = data.slice(2);
      setQuestion(correctNovel);
      setOptions(shuffle([correctNovel, ...incorrectNovels]));
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswer = (selectedNovel) => {
    if (selectedNovel.ncode === question.ncode) {
      setResult('正解！');
    } else {
      setResult('不正解...');
    }
  };

  return (
    <div>
      {question && (
        <>
          <p>{question.story}</p>
          {options.map((novel) => (
            <button key={novel.ncode} onClick={() => handleAnswer(novel)}>
              {novel.title}
            </button>
          ))}
          {result && <p>{result}</p>}
          {result === '正解！' && <button onClick={fetchQuizData}>次の問題</button>}
        </>
      )}
    </div>
  );
};

export default Quiz;