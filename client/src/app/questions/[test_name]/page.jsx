"use client";
import React, { useState, useEffect } from "react";
import theme from "../../../../src/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";

const Index = ({ params }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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

  const handleNextQuestion = () => {
    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="container">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <h1>Questions Page</h1>
        {questions.length > 0 && answers.length > 0 && (
          <div>
            <ul>
              <li>
                {questions[currentQuestionIndex].question_text}
                <ul>
                  {answers
                    .filter(
                      (answer) =>
                        answer.question_id ===
                        questions[currentQuestionIndex].question_id
                    )
                    .map((answer) => (
                      <li key={answer.answer_id}>{answer.answer_text}</li>
                    ))}
                </ul>
              </li>
            </ul>
            {currentQuestionIndex < questions.length - 1 && (
              <button onClick={handleNextQuestion}>Next Question</button>
            )}
          </div>
        )}
      </ThemeProvider>
    </div>
  );
};

export default Index;
