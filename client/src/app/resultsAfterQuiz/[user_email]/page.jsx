"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";

import Button from "@mui/material/Button";

import "../../page.css";

const Results = ({ params }) => {
  // Declare userResults using useState
  const [userResults, setUserResults] = useState([]);
  const userEmail = decodeURIComponent(params.user_email);
  const [user, setUser] = useState([]);

  useEffect(() => {
    // Retrieve user results from local storage
    const storedUserResults = JSON.parse(localStorage.getItem("userResponses"));
    console.log(storedUserResults);

    // Update the state with the retrieved user results
    setUserResults(storedUserResults || []);
  }, []); // Empty dependency array ensures this runs only once on mount

  // Fetch user information from the database

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

  if (userResults.length === 0) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  }
  // Separate correct and incorrect answers
  const correctAnswers = userResults.filter((result) => result.correct);
  const incorrectAnswers = userResults.filter((result) => !result.correct);

  return (
    <div className="container">
      <div className="header">
        <div className="text">Results</div>
        <div className="underline"></div>
      </div>
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
          Question {result.question_id}: Answer {result.answer_id} - Incorrect
        </p>
      ))}
      <Link
        href={user.admin ? `/menuAdmin/${userEmail}` : `/menu/${userEmail}`}
        passHref
      >
        <Button variant="contained" color="primary" style={{ margin: "5px" }}>
          Go Back to Menu
        </Button>
      </Link>
    </div>
  );
};

export default Results;
