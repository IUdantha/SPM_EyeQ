import React, {useContext, useState} from "react";
import {useHttpClient} from "../components/http-hook";
import {AuthContext} from "../../../common/context/auth-context";

import "./Question.css";

// Images of Letter E
import E400left from "../images/E-400x400-left.png";
import E400right from "../images/E-400x400-right.png";
import E400top from "../images/E-400x400-top.png";
import E400bottom from "../images/E-400x400-bottom.png";

import E200left from "../images/E-200x200-left.png";
import E200right from "../images/E-200x200-right.png";
import E200top from "../images/E-200x200-top.png";
import E200bottom from "../images/E-200x200-bottom.png";

import E50left from "../images/E-50x50-left.png";
import E50right from "../images/E-50x50-right.png";
import E50top from "../images/E-50x50-top.png";
import E50bottom from "../images/E-50x50-bottom.png";

const Question = () => {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const Auth = useContext(AuthContext);

  const questions = [
    {
      imageUrl: E400left,
      options: [
        {id: 0, text: E200right, isCorrect: false},
        {id: 1, text: E200left, isCorrect: true},
        {id: 2, text: E200top, isCorrect: false},
        {id: 3, text: E200bottom, isCorrect: false},
      ],
    },
    {
      imageUrl: E200right,
      options: [
        {id: 0, text: E200right, isCorrect: true},
        {id: 1, text: E200left, isCorrect: false},
        {id: 2, text: E200top, isCorrect: false},
        {id: 3, text: E200bottom, isCorrect: false},
      ],
    },
    {
      imageUrl: E200left,
      options: [
        {id: 0, text: E200right, isCorrect: false},
        {id: 1, text: E200left, isCorrect: true},
        {id: 2, text: E200top, isCorrect: false},
        {id: 3, text: E200bottom, isCorrect: false},
      ],
    },
    {
      imageUrl: E50bottom,
      options: [
        {id: 0, text: E200right, isCorrect: false},
        {id: 1, text: E200left, isCorrect: false},
        {id: 2, text: E200top, isCorrect: false},
        {id: 3, text: E200bottom, isCorrect: true},
      ],
    },
    {
      imageUrl: E200top,
      options: [
        {id: 0, text: E200right, isCorrect: false},
        {id: 1, text: E200left, isCorrect: false},
        {id: 2, text: E200top, isCorrect: true},
        {id: 3, text: E200bottom, isCorrect: false},
      ],
    },
  ];

  // Helper Functions

  /* A possible answer was clicked */
  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  /* Save test in the database */
  const testAddSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/vTest/`,
        "POST",
        JSON.stringify({
          userId: Auth.userId,
          date: new Date(),
          result: score,
          note: "--",
        }),
        {
          "Content-Type": "application/json",
        }
      );

      setScore(0);
      setCurrentQuestion(0);
      setShowResults(false);
    } catch (e) {}
  };

  return (
    <div className="Question">
      {/* 1. Header  */}
      <h1 className="main-headings">E - Thumbling Test</h1>

      {/* 2. Current Score  */}
      <h2>Score: {score}</h2>

      {/* 3. Show results or show the question game  */}
      {showResults ? (
        /* 4. Final Results */
        <div className="final-results">
          <h1 className="main-headings">Final Results</h1>
          <h2>
            {score} out of {questions.length} correct - (
            {(score / questions.length) * 100}%)
          </h2>
          <button className="qButton" onClick={() => restartGame()}>
            Restart the test
          </button>
          <button className="saveButton" onClick={testAddSubmitHandler}>
            Save my Test
          </button>
        </div>
      ) : (
        /* 5. Question Card  */
        <div className="question-card">
          {/* Current Question  */}
          <h2>
            Test: {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="question-text">Select the correct E position</h3>
          <center>
            <img src={questions[currentQuestion].imageUrl} alt="Question" />
          </center>

          {/* List of possible answers  */}
          <ul className="qUList">
            {questions[currentQuestion].options.map((option) => {
              return (
                <li
                  className="qLItem"
                  key={option.id}
                  onClick={() => optionClicked(option.isCorrect)}
                >
                  <img width="100%" src={option.text} alt="Answers" />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Question;
