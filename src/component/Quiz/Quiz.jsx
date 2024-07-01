import React, { useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0); //tracks the current quetion index
  const [score, setScore] = useState(0); // track the number of the answer
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answer, setAnswer] = useState(null);

  const checkAnswer = (ans) => {
    if (answer === null) {
      setAnswer(ans);
      if (ans?.isCorrect) {
        setScore(score + 1);
      }
    }
  };
  const nextQuestion = () => {
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
                  background:
                    answer && answer?.isCorrect && answer.id === ops.id
                      ? "#91d691" // green color
                      : answer && !answer?.isCorrect && answer.id === ops.id
                      ? "#ce6363"
                      : "",
                }}
                onClick={() => checkAnswer(ops)}
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
