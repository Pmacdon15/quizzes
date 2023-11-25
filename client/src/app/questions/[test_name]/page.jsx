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

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5544/questions/${params.test_name}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Failed to get tests: ", error);
      }
    };
    fetchQuestions();
  }, []);

  console.log(questions);

  return (
    <div className="container">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <h1>Questions Page</h1>
        <ul>
          <li key={params.test_name}>
            {questions.length > 0 && (
              <li key={questions[0].test_id}>{questions[0].question_text}</li>
            )}
          </li>
        </ul>
      </ThemeProvider>
    </div>
  );
};

export default index;
