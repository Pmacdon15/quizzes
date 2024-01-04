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
  const [userResponses, setUserResponses] = useState([]);

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

  function processAnswer(answers, currentQuestionIndex, selectedAnswer, questions, setUserResponses) {
    const filteredAnswers = answers.filter(
      (answer) =>
        answer.question_id === questions[currentQuestionIndex].question_id
    );
  
    const correctAnswer = filteredAnswers.find(
      (answer) => answer.correct === true
    );
  
    // todo remove Log relevant information for debugging
    console.log("Selected Answer:", selectedAnswer);
    console.log("Filtered Answers:", filteredAnswers);
    console.log("Correct Answer:", correctAnswer);
  
    // Calculate whether the selected answer is correct
    const isCorrect =
      selectedAnswer === (correctAnswer ? correctAnswer.answer_text : null);
  
    // todo remove Log whether the answer is correct
    console.log("Is Correct:", isCorrect);
  
    // Update the userResponses array with information about the current question
    setUserResponses((prevResponses) => [
      ...prevResponses,
      {
        question_id: questions[currentQuestionIndex].question_id,
        answer_id: correctAnswer ? correctAnswer.answer_id : null,
        correct: isCorrect,
      },
    ]);
  }

  const handleNextQuestion = () => {
    
    processAnswer(answers, currentQuestionIndex, selectedAnswer, questions, setUserResponses);

    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    // Clear the selected answer for the next question
    setSelectedAnswer(null);
  };

  useEffect(() => {
    // Todo remove Log the userResponses array
    console.log("userResponses in useEffect:", userResponses);
  }, [userResponses]);

  const handleAnswerChange = (event) => {
    // Update the selected answer when the user clicks on a radio button
    setSelectedAnswer(event.target.value);
  };

  const handleGoToPrevQuestion = () => {
    // Move to the last question
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    // Remove the last entry from the userResponses array
    setUserResponses((prevResponses) => prevResponses.slice(0, -1));
    // Clear the selected answer for the next question
    setSelectedAnswer(null);
  };

  const handleFinishTest = () => {
    
    processAnswer(answers, currentQuestionIndex, selectedAnswer, questions, setUserResponses);

    // todo remove Log the userResponses array
    console.log("userResponses in handleFinishTest:", userResponses);

    // Calculate the number of correct answers
    const numCorrect = userResponses.filter(
      (response) => response.correct
    ).length;

    // Display the number of correct answers and total number of questions
    alert(`You got ${numCorrect} out of ${questions.length} correct!`);
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
