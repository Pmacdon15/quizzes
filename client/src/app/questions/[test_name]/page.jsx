"use client";
import React, { useState, useEffect } from "react";
import theme from "../../../../src/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import axios from "axios";

import "./page.css";

const Index = ({ params }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

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
    // Clear the selected answer for the next question
    setSelectedAnswer(null);
  };

  const handleAnswerChange = (event) => {
    // Update the selected answer when the user clicks on a radio button
    setSelectedAnswer(event.target.value);
  };

  const handleLastQuestion = () => {  
    // Move to the last question
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    // Clear the selected answer for the next question
    setSelectedAnswer(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: "#ffffff",
            height: "80vh",
            padding: "3%",
            // paddingLeft: "5%",
            marginTop: "12%",
            borderRadius: "10px",
          }}
        >
          <h1>Questions Page</h1>
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
                  // onClick={handleFinishTest}
                >
                  Finish Test
                </Button>
              )}
              {currentQuestionIndex > 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "5px" }}
                  onClick={handleLastQuestion}
                >
                  Last Question
                </Button>
              )}
            </div>
          )}
        </Box>
        <Link
          href="/quiz"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button variant="contained" color="primary" style={{ margin: "5px" }}>
            Go Back to Menu
          </Button>
        </Link>
      </Container>
    </ThemeProvider>
  );
};

export default Index;
