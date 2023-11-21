'use client'
import React, {useState, useEffect} from 'react';
import theme from '../../../src/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';

const index = () => {
const [questions,setQuestions] = useState([]);

useEffect(() => {
  const fetchQuestions = async() => {
    try{
      const response = await axios.get("/questions/Math");
      setQuestions(response.data);
    }
    catch (error){
      console.error('Failed to get questions: ', error);
    }
  }
  fetchQuestions();
}, [])

console.log(questions)


  return (
    <div className="container">
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <h1>Quiz Page</h1>
    <ul>
    {questions.map((question) => (
            <li key={question.question_id}>
              {question.question_text}
            </li>
          ))}
    </ul>
  </ThemeProvider>
  </div>
  )
}

export default index