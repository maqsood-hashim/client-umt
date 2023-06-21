import React, { useEffect, useState } from 'react';
import Start from './Start';
import Quiz from './Quiz';
import TimeUp from './TimeUp';
import Result from './Result';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import base from './BaseUrl';
import { CircularProgress } from '@material-ui/core';

const TestInfo = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const level = searchParams.get('level');
  const category = searchParams.get('category');

  const [quizs, setQuizs] = useState([]);
  const [question, setQuesion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [marks, setMarks] = useState(0);

  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(60);

  useEffect(() => {
    setLoading(true)
    fetch(`${base}/get-random-questions?category=${category}&level=${level}`)
      .then(response => response.json())
      .then(data => {
        
            let numberOfQuestions = category === "mega" ? 10 : 5;
            const filteredData = data.slice(0, numberOfQuestions);
        setQuizs(filteredData );
        startTimer();
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
      setLoading(false)
  }, []);

  useEffect(() => {
    
    if (quizs.length > questionIndex) {
      setQuesion(quizs[questionIndex]);
    }

  }, [quizs, questionIndex]);

  const startQuiz = () => {
    setShowStart(false);
    setShowQuiz(true);
    
  };

  const startTimer = () => {
    const timer = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  };

  useEffect(() => {
    if (time === 0) {
      nextQuestion();
    }
  }, [time]);

  const checkAnswer = (event, selected) => {
    if (!selectedAnswer) {
      setCorrectAnswer(question.answer);
      setSelectedAnswer(selected);

      if (selected === question.answer) {
        event.target.classList.add('bg-success');
        setMarks(marks + 10);
      } else {
        event.target.classList.add('bg-danger');
      }
    }
  };

  const nextQuestion = () => {
    setTime(60);
    setCorrectAnswer('');
    setSelectedAnswer('');
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
    setQuestionIndex(prevIndex => prevIndex + 1);

    if (questionIndex + 1 === quizs.length) {
      setShowResult(true);
    }
  };

 

  const showTheResult = () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
  };

  const startOver = () => {
    window.location.href = '/course/647840e6c22ef933c087565a';
  };

  return (
    <>
    <div style={{ userSelect: 'none' }}>
       <Start startQuiz={startQuiz} showStart={showStart} isLoading={loading} />


  
      {quizs.length > 0 ? (
          <Quiz
            time={time}
            showQuiz={showQuiz}
            question={question}
            quizs={quizs}
            checkAnswer={checkAnswer}
            correctAnswer={correctAnswer}
            selectedAnswer={selectedAnswer}
            questionIndex={questionIndex}
            nextQuestion={nextQuestion}
            showTheResult={showTheResult}
          />
        ) : (
          //Show loading state or spinner when quizs data is not available
          <div className="text-center bg-dark">
            <CircularProgress color="secondary" />
          </div>
        
        )}

      <Result
        level={level}
        category={category}
        showResult={showResult}
        quizs={quizs}
        marks={marks}
        startOver={startOver}
      />
      </div>
    </>
  );
};

export default TestInfo;
