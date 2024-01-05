"use client";
import React, { useEffect, useState } from "react";
import theme from "../../../../src/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "next/link";
import Button from "@mui/material/Button";

const Index = ({ params }) => {
  // Declare userResults using useState
  const [userResults, setUserResults] = useState([]);

  useEffect(() => {
    // Retrieve user results from local storage
    const storedUserResults = JSON.parse(localStorage.getItem("userResponses"));
    console.log(storedUserResults);

    // Update the state with the retrieved user results
    setUserResults(storedUserResults || []);
  }, []); // Empty dependency array ensures this runs only once on mount

    
  if (userResults.length === 0) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box
            sx={{
              bgcolor: "#ffffff",
              height: "80vh",
              padding: "3%",
              marginTop: "12%",
              borderRadius: "10px",
            }}
          >
            <h1>Loading...</h1>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  // Separate correct and incorrect answers
  const correctAnswers = userResults.filter((result) => result.correct);
  const incorrectAnswers = userResults.filter((result) => !result.correct);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: "#ffffff",
            height: "80vh",
            padding: "3%",
            marginTop: "12%",
            borderRadius: "10px",
          }}
        >
          <h1>Results Page</h1>
          <h2>Last results</h2>
          <h3>Correct Answers:</h3>
          {correctAnswers.map((result, index) => (
            <p key={index}>
              Question {result.question_id}: Answer {result.answer_id} - Correct
            </p>
          ))}
          <h3>Incorrect Answers:</h3>
          {incorrectAnswers.map((result, index) => (
            <p key={index}>
              Question {result.question_id}: Answer {result.answer_id} -
              Incorrect
            </p>
          ))}
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
