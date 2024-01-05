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

import * as React from "react";
import { useForm } from "react-hook-form";

//  import "../page.css";

const registrationPage = () => {
  const { register, handleSubmit, reset } = useForm();
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
