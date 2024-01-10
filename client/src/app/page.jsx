"use client";
import Link from "next/link";
import theme from "../../src/theme";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

import axios from "axios";

import * as React from "react";
import { useForm } from "react-hook-form";

import "./page.css";

export default function Home() {
  // document.title = "Login";
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5544/login", data);

      if (response.status === 200) {
        //console.log("Login successful. User data:", response.data);

        // Check if the user is an owner based on the server response
        if (response.data[0].admin === true) {
          // User is an owner, handle accordingly (redirect or other actions)
          console.log("User is an admin. Redirecting to Admin page.");

          window.location.href = `/menuAdmin/${response.data[0].email}`;
        } else {
          console.log("User is not an admin. Redirecting to menu.");
          window.location.href = `/menu/${response.data[0].email}`;
        }
      }      
    } catch (error) {
      console.error("Error while submitting the form:", error);
      alert("Error while logging in. Please try again.");
    }
    // Clear the form after submission
    reset();
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">login</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="custom-form">
        {/* <form className="custom-form"> */}
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
        <div className="forgot-password">
          Lost your password?
          <span>Click Here!</span>
        </div>
        <div className="register">
          Don't have an account?
          <Link href="/registration">
            <span>Click Here!</span>
          </Link>
        </div>
        <div className="submit-container">
          <Button type="submit" variant="contained">
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
