"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../page.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const Results = ({ params }) => {
  const user_email = decodeURIComponent(params.user_email);

  // fetch user results from the database
  const [userResults, setUserResults] = useState([]);
  useEffect(() => {
    const fetchUserResults = async () => {
      const response = await fetch(
        `http://localhost:5544/results/${user_email}`
      ).then((res) => res.json());
      setUserResults(response);
    };
    fetchUserResults();
  }, [user_email]);

  // Fetch user information from the database
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        `http://localhost:5544/user/${user_email}`
      ).then((res) => res.json());

      if (Array.isArray(response) && response.length > 0) {
        setUser(response[0]);
        // console.log("user.admin", response[0].admin); // Access admin from the response
      }
    };
    fetchUser();
  }, [user_email]);

  if (userResults.length === 0 || Object.keys(user).length === 0) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  }

  // Calculate totals
  const totalCorrect = userResults.reduce(
    (sum, result) => sum + result.total_correct,
    0
  );
  const totalIncorrect = userResults.reduce(
    (sum, result) => sum + (result.total_questions - result.total_correct),
    0
  );
  const totalQuestions = userResults.reduce(
    (sum, result) => sum + result.total_questions,
    0
  );

  return (
    <div className="Container">
      <div className="header">
        <div className="text">Results</div>
        <div className="underline"></div>
      </div>

      {/* Display individual result tables */}
      {userResults.map((result, index) => (
        <div key={index} className="resultTable">
          {" "}
          {/* Add key prop here */}
          <TableContainer
            component={Paper}
            style={{ background: "#637bfe", color: '#fff' }}
          >
            <Table sx={{ maxWidth: "250px" }} aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Quiz</TableCell>
                  <TableCell align="center">Correct</TableCell>
                  <TableCell align="center">Incorrect</TableCell>
                  <TableCell align="center">Amount of Questions</TableCell>
                  <TableCell align="center">Date Taken</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {result.test_name}
                  </TableCell>
                  <TableCell align="center">{result.total_correct}</TableCell>
                  <TableCell align="center">
                    {result.total_questions - result.total_correct}
                  </TableCell>
                  <TableCell align="center">{result.total_questions}</TableCell>
                  <TableCell align="center">{result.date_taken}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}

      {/* Totals Table */}
      <div className="totalsTable">
        <TableContainer
          component={Paper}
          style={{ background:"#637bfe", color: "#333" }}
        >
          <Table sx={{ maxWidth: "250px" }} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell align="center">Total Correct</TableCell>
                <TableCell align="center">Total Incorrect</TableCell>
                <TableCell align="center">Total Questions</TableCell>
                <TableCell align="center">-</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell align="center">{totalCorrect}</TableCell>
                <TableCell align="center">{totalIncorrect}</TableCell>
                <TableCell align="center">{totalQuestions}</TableCell>
                <TableCell align="center">-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="options-container">
      <Link
        href={user.admin ? `/menuAdmin/${user_email}` : `/menu/${user_email}`}
        passHref
      >
        <Button variant="contained" color="primary" style={{ margin: "5px" }}>
          Go Back to Menu
        </Button>
      </Link>
      </div>
    </div>
  );
};

export default Results;
