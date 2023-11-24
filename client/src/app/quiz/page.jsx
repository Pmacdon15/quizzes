'use client'
import React, {useState, useEffect} from 'react';
import theme from '../../../src/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';

const index = () => {
const [tests, setTests] = useState([]);

useEffect(() => {
  const fetchTests = async() => {
    try{
      const response = await axios.get("http://localhost:5544/tests");
      setTests(response.data);
    }
    catch (error){
      console.error('Failed to get questions: ', error);
    }
  }
  fetchTests();
}, [])

console.log(tests)


  return (
    <div className="container">
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <h1>Quiz Page</h1>
    <ul>
    {tests.map((test) => (
            <li key={test.test_id}>
              {test.test_name}
            </li>
          ))}
    </ul>
  </ThemeProvider>
  </div>
  )
}

export default index