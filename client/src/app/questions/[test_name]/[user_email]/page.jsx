"use client";
import React, { useState, useEffect } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

import Link from "next/link";
import axios from "axios";

import "./page.css";
import "../../../page.css"

const Questions = ({ params }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userResponses, setUserResponses] = useState([]);
  const userEmail = decodeURIComponent(params.user_email);
  const [user, setUser] = useState([]);

  // Fetch user data
  useEffect(() => {
    const fetchUserResults = async () => {
      const response = await fetch(
        `http://localhost:5544/user/${userEmail}`
      ).then((res) => res.json());
      console.log("response", response);

      // Assuming response is an array, access the first user
      if (Array.isArray(response) && response.length > 0) {
        setUser(response[0]);
      }
    };
    fetchUserResults();
  }, [userEmail]);

  // Fetch questions and answers
  useEffect(() => {
    const fetchQuestionsAndAnswers = async () => {
      try {
        const [questionsResponse, answersResponse] = await Promise.all([
          axios.get(`http://localhost:5544/questions/${params.test_name}`),
          axios.get(`http://localhost:5544/answers/${params.test_name}`),
        ]);
        setQuestions(questionsResponse.data);
        setAnswers(answersResponse.data);
      } catch (error) {
        console.error("Failed to get tests: ", error);
      }
    };
    fetchQuestionsAndAnswers();
  }, []);

  // Calculate the number of correct answers when userResponses is updated
  useEffect(() => {
    // Calculate the number of correct answers when userResponses is updated
    const numCorrect = userResponses.filter(
      (response) => response.correct
    ).length;    

    // Store userResponses in local storage
    localStorage.setItem("userResponses", JSON.stringify(userResponses));

    if (userResponses.length === questions.length && questions.length > 0) {
      alert(`You got ${numCorrect} out of ${questions.length} correct!`);
    }
  }, [userResponses, questions.length]);

  // Process the answer and update the userResponses state
  function processAnswer(
    answers,
    currentQuestionIndex,
    selectedAnswer,
    questions,
    setUserResponses
  ) {
    return new Promise((resolve) => {
      const filteredAnswers = answers.filter(
        (answer) =>
          answer.question_id === questions[currentQuestionIndex].question_id
      );
      const correctAnswer = filteredAnswers.find(
        (answer) => answer.correct === true
      );
      // Calculate whether the selected answer is correct
      const isCorrect =
        selectedAnswer === (correctAnswer ? correctAnswer.answer_text : null);

      // Update the userResponses array with information about the current question
      setUserResponses((prevResponses) => [
        ...prevResponses,
        {
          question_id: questions[currentQuestionIndex].question_id,
          answer_id: correctAnswer ? correctAnswer.answer_id : null,
          correct: isCorrect,
        },
      ]);
      // Resolve the promise after updating user responses
      resolve();
    });
  }

  // Update the selected answer when the user clicks on a radio button
  const handleAnswerChange = (event) => {
    // Update the selected answer when the user clicks on a radio button
    setSelectedAnswer(event.target.value);
  };
  // Process the answer and update the userResponses state
  const handleNextQuestion = () => {
    processAnswer(
      answers,
      currentQuestionIndex,
      selectedAnswer,
      questions,
      setUserResponses
    );
    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    // Clear the selected answer for the next question
    setSelectedAnswer(null);
  };

  // Move to the previous question
  const handleGoToPrevQuestion = () => {
    // Move to the last question
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    // Remove the last entry from the userResponses array
    setUserResponses((prevResponses) => prevResponses.slice(0, -1));
    // Clear the selected answer for the next question
    setSelectedAnswer(null);
  };

  // Calculate the total correct responses and create userResponseObj
  const handleFinishTest = async () => {
    // Process the answer and update the userResponses state
    await processAnswer(
      answers,
      currentQuestionIndex,
      selectedAnswer,
      questions,
      setUserResponses
    );
    // Calculate the total correct responses and create userResponseObj
    const userResponseObj = {
      user_email: decodeURIComponent(params.user_email),
      test_name: params.test_name,
      total_questions: questions.length,
      total_correct: userResponses.filter((response) => response.correct)
        .length,
    };   
    // Send userResponseObj to backend
    try {
      await axios.post("http://localhost:5544/results", userResponseObj);
    } catch (err) {
      console.log(err);
    }
    // Redirect to results page
    window.location.href = `/results/${userResponseObj.user_email}`;
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Questions</div>
        <div className="underline"></div>
      </div>
      {questions.length > 0 && answers.length > 0 && (
        <div className="questions">
          {questions[currentQuestionIndex].question_text}
          <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
            {answers
              .filter(
                (answer) =>
                  answer.question_id ===
                  questions[currentQuestionIndex].question_id
              )
              .map((answer) => (
                <FormControlLabel
                  key={answer.answer_id}
                  value={answer.answer_text}
                  control={<Radio />}
                  label={answer.answer_text}
                />
              ))}
          </RadioGroup>
          {/* If the current question is not the last question, show the Next Question button */}
          {currentQuestionIndex < questions.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "5px" }}
              onClick={handleNextQuestion}
            >
              Next Question
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: "5px" }}
              onClick={handleFinishTest}
            >
              Finish Test
            </Button>
          )}
          {/* If the current question is not the first question, show the Last Question button */}
          {currentQuestionIndex > 0 && (
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "5px" }}
              onClick={handleGoToPrevQuestion}
            >
              Last Question
            </Button>
          )}
        </div>
      )}
      <div className="options-container">
        <Link
          href={user.admin ? `/menuAdmin/${userEmail}` : `/menu/${userEmail}`}
          passHref
        >
          <Button variant="contained" color="primary" style={{ margin: "5px" }}>
            Go Back to Menu
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Questions;
