"use client";
import Link from "next/link";
import theme from "../../../src/theme";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

import axios from "axios";

import React, { useState, useEffect } from "react";
import { setValue, useForm } from "react-hook-form";

import "../page.css";

const registrationPage = () => {  
  const { register, handleSubmit, reset } = useForm();

  const [emailValue, setEmailValue] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
    setEmailError(event.target.value === "" || !event.target.value.includes("@"));
  };

  useEffect(() => {
    setEmailValue("email", emailValue);
  }, [emailValue, setEmailValue]);

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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="header">
            <div className="text">Register</div>
            <div className="underline"></div>
          </div>

          {/* <form onSubmit={handleSubmit(onSubmit)} className="custom-form"> */}
          <form className="custom-form">
            <TextField
              sx={{ width: "100%" }}
              {...register("email")}
              label="Email"
              variant="outlined"
              onChange={handleEmailChange}
              // value={emailValue}
              error={emailError}
              helperText={emailError ? "Please enter a valid email" : ""}
            />
            <TextField
              sx={{ width: "100%" }}
              {...register("password")}
              label="Password"
              variant="outlined"
              type="password"
            />      
            <TextField
              sx={{ width: "100%" }}
              {...register("first_name")}
              label="First Name"
              variant="outlined"
            />
              
            <TextField
              sx={{ width: "100%" }}
              {...register("confirm_password")}
              label="Confirm Password"
              variant="outlined"
              type="password"  
            />
            
            <div className="submit-container">
              <Button type="submit" variant="contained">
                Register
              </Button>
            </div>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default registrationPage;
