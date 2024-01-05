'use client'
import Link from 'next/link';
import theme from '../../src/theme';
import {Button} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

import * as React from "react";
import { useForm } from "react-hook-form";

import "./page.css"

export default function Home() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  return (
    <main>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
            display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}
        >
        <div className="header">
            <div className="text">login</div>
            <div className="underline"></div>
          </div>
          <br></br>
          {/* <form onSubmit={handleSubmit(onSubmit)} className="custom-form"> */}
          <form className="custom-form">
            <TextField
              sx={{ width: "80%" }}
              {...register("email")}
              label="Email"
              variant="outlined"
            />
            <TextField
              sx={{ width: "80%" }}
              {...register("password")}
              label="Password"
              variant="outlined"
              type="password"
            />

            <div className="forgot-password">
              Lost your password? <span>Click Here!</span>              
            </div>
            <div className="register">              
              Don't have an account? <span>Click Here!</span>
            </div>

            <div className="submit-container">
              <Button type="submit" variant="contained">
                Sign In
              </Button>
            </div>
          </form>
        </Box>
        </Container>
      </ThemeProvider>
      </div>
    </main>
  )
}
