'use client'
import React, {useState} from 'react';
import theme from '../../../src/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const index = () => {
  return (
    <div className="container">
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <h1>Quiz Page</h1>
  </ThemeProvider>
  </div>
  )
}

export default index