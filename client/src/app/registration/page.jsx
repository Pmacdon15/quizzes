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
import { set, useForm } from "react-hook-form";

import "../page.css";

const registrationPage = () => {  
  const { register, handleSubmit, reset, setValue } = useForm();

  const [emailValue, setEmailValue] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);

  const handleEmailChange = (event) => {
    // const { value } = event.target;
    setEmailValue(event.target.value);
    setEmailError(event.target.value === "" || !event.target.value.includes("@") || !event.target.value.includes(".com"));
  };

  useEffect(() => {
    setEmailValue("email", emailValue);
  }, [emailValue, setValue]);

  const [firstNameValue, setFirstNameValue] = React.useState("");
  const [firstNameError, setFirstNameError] = React.useState(false);

  const handleFirstNameChange = (event) => {
    setFirstNameValue(event.target.value);
    setFirstNameError(event.target.value.trim().length < 3);
  };

  const [passwordValue, setPasswordValue] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPasswordValue(event.target.value);
    setPasswordError(event.target.value.trim().length < 7); 
  }

  useEffect(() => {
    setValue("password", passwordValue);
  }, [passwordValue, setValue]);

  const [confirmPasswordValue, setConfirmPasswordValue] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);

  const handleConfirmPasswordChange = (event) => {
    setConfirmPasswordValue(event.target.value.trim());
    setConfirmPasswordError(event.target.value.trim() !== passwordValue.trim());
  }

  useEffect(() => {
    setValue("confirm_password", confirmPasswordValue);    
  }, [confirmPasswordValue, setValue]);

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
              error={emailError}
              helperText={emailError ? "Please enter a valid email" : ""}
            />              
            <TextField
              sx={{ width: "100%" }}
              {...register("first_name")}
              label="First Name"
              variant="outlined"
              onChange={handleFirstNameChange}  
              error={firstNameError}
              helperText={firstNameError ? "Please enter a valid first name at least 3" : ""}
            />
             <TextField
              sx={{ width: "100%" }}
              {...register("password")}
              label="Password"
              variant="outlined"
              type="password"
              onChange={handlePasswordChange}
              error={passwordError}
              helperText={passwordError ? "Please enter a valid password at least 7 Characters long" : ""}
            />                 
            <TextField
              sx={{ width: "100%" }}
              {...register("confirm_password")}
              label="Confirm Password"
              variant="outlined"
              type="password"  
              onChange={handleConfirmPasswordChange}
              error={confirmPasswordError}
              helperText={confirmPasswordError ? "Passwords do not match" : ""}
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
