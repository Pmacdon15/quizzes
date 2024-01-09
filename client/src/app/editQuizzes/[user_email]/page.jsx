"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";
import axios from "axios";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

import "../../page.css";

const Quizzes = ({ params }) => {
  const { register, handleSubmit, setValue } = useForm();
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

  const [quizName, setQuizName] = useState("");
  const [quizNameError, setQuizNameError] = useState("");

  const handleQuizNameChange = (event) => {
    const { value } = event.target;
    setQuizName(value);
    setQuizNameError(value.trim().length < 3);

    for (let i = 0; i < quizSlugs.length; i++) {
      if (quizSlugs[i] === value || value.trim().length < 3) {
        setQuizNameError(true);
        break;
      } else {
        setQuizNameError(false);
      }
    }
  };

  const addQuiz = async (data) => {
    try {
      if (quizNameError) {
        alert("Error adding quiz");
        return;
      }
      const response = await axios.post("http://localhost:5544/test", {
        test_name: quizName,
      });
      console.log(response);

      fetchQuizSlugs();
    } catch (err) {
      console.log(err);
    }
  };

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
        <div className="text">Quizzes</div>
        <div className="underline"></div>
      </div>
      <div className="submit-container">
        {quizSlugs.map((slug) => (
          <div className="display-edit-quizzes" key={slug}>
            <div className="display-label">
            <label>{slug}</label>
            </div>
            <div className="display-buttons">
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
          </div>
        ))}
        <form onSubmit={handleSubmit(addQuiz)} className="custom-form">
          <TextField
            {...register("test_name", { required: true })}
            label="Quiz Name"
            variant="outlined"
            onChange={handleQuizNameChange}
            error={!!quizNameError}
            helperText={
              quizNameError ? "Quiz name must be at least 3 characters" : ""
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: "5px" }}
          >
            Add Quiz
          </Button>
        </form>
      </div>
      <div className="options-container">
        <Link href={`/menuAdmin/${userEmail}`} passHref>
          <Button variant="contained" color="primary" style={{ margin: "5px" }}>
            Go Back to Menu
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Quizzes;
