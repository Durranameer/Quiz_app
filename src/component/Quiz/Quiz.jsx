import React, { useState, useRef, useEffect } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0); //tracks the current quetion index
  const [lock, setLock] = useState(false); //prevent multiple answers from being selected
  const [score, setScore] = useState(0); // track the number of the answer
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answer, setAnswer] = useState(null);

  const checkAnswer = (e, ans) => {
    setAnswer(ans);
    if (!lock) {
      if (answer?.isCorrect) {
        setScore(score + 1);
      }
      setLock(true);
    }
  };
  const nextQuestion = () => {
    setLock(false);
    setAnswer(null);
    if (index < data.length - 1) {
      setIndex(index + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {!quizCompleted ? (
        <>
          <h2>
            {index + 1}. {data[index].question}
          </h2>
          <ul>
            {data[index].option.map((ops) => (
              <li
                key={ops.id}
                style={{
                  background: answer
                    ? answer?.isCorrect && answer.id === ops.id
                      ? "#91d691"
                      : "#ce6363"
                    : "transparent",
                }}
                onClick={(e) => checkAnswer(e, ops)}
              >
                {ops.title}
              </li>
            ))}
          </ul>
          <button onClick={nextQuestion}>Next</button>
          <p className="index">
            {index + 1} of {data.length} Questions
          </p>
        </>
      ) : (
        <h2>
          Your score is {score} out of {data.length}
        </h2>
      )}
    </div>
  );
};

export default Quiz;
