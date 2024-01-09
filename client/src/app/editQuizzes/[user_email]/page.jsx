"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

import "../../page.css";

const Quiz = ({ params }) => {
  // const quizSlugs = ["Math", "Places", "Shapes"];
  const userEmail = decodeURIComponent(params.user_email);

  const [user, setUser] = useState([]);

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

  const [quizSlugs, setQuizSlugs] = useState([]);

  const fetchQuizSlugs = async () => {
    const response = await fetch(`http://localhost:5544/tests`).then((res) =>
      res.json()
    );
    console.log("response", response);
    // Loop through the response and add response[i].test_name as a slug
    const slugs = [];
    for (let i = 0; i < response.length; i++) {
      slugs.push(response[i].test_name);
    }
    setQuizSlugs(slugs);
  };

  useEffect(() => {
    fetchQuizSlugs();
  }, []);

  const deleteQuiz = async (slug) => {
    const response = await fetch(`http://localhost:5544/test/${slug}`, {
      method: "DELETE",
    }).then((res) => res.json());
    console.log("response", response);
    fetchQuizSlugs();
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Quiz</div>
        <div className="underline"></div>
      </div>
      <div className="submit-container">
        {quizSlugs.map((slug) => (
          <div className="test" key={slug}>
            <label>{slug}</label>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "5px" }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "5px" }}
              onClick={() => deleteQuiz(slug)}
            >
              Delete
            </Button>
          </div>
        ))}
        <TextField />
        <Button variant="contained" color="primary" style={{ margin: "5px" }}>
          Add Quiz
        </Button>
      </div>
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
// {quizSlugs.map((quiz) => (
//   <Link key={quiz} href={`/questions/${encodeURIComponent(quiz)}`} passHref>
//     <Button variant="contained" color="primary" style={{ margin: '5px' }}>
//       {quiz}

export default Quiz;
