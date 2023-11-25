// 'use client'
// import { useRouter } from 'next/navigation'

// //import { useRouter } from 'next/router'

// export default function Page({ params }) {
//   return <div>My Post: {params.test}</div>
// }

"use client";
import React, { useState, useEffect } from "react";
import theme from "../../../../src/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";

const index = ({ params }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

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

  console.log(questions);
  console.log(answers);

  return (
    <div className="container">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <h1>Questions Page</h1>
        <ul>
          {questions.map((question) => (
            <li key={question.question_id}>
              {question.question_text}
              <ul>
                {answers
                  .filter(
                    (answer) => answer.question_id === question.question_id
                  )
                  .map((answer) => (
                    <li key={answer.answer_id}>{answer.answer_text}</li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </ThemeProvider>
    </div>
  );
};

export default index;
