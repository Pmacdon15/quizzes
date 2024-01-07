"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../page.css";

// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Results = ({ params }) => {
  const user_email = decodeURIComponent(params.user_email);
  console.log(user_email);

  // fetch user results from the database
  const [userResults, setUserResults] = useState([]);

  useEffect(() => {
    const fetchUserResults = async () => {
      const response = await fetch(
        `http://localhost:5544/results/${user_email}`
      ).then((res) => res.json());
      console.log("response", response);
      // Remove first result from array
      
      setUserResults(response);
    };
    fetchUserResults();
  }, [user_email]);

  if (userResults.length === 0) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  }
  
  return (
    <div className="Container">
      <div className="header">
        <div className="text">Results</div>
        <div className="underline"></div>
      </div>
        {/* loop threw userResults and display them  in a table */}
        <TableContainer component={Paper} >
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
              {userResults.map((result) => (
                <TableRow
                  key={result.id}
                  sx={{ '&:last-child td, &:last-child th': {backgroundColor: "theme.palette.action.hover", border: 0} }}
                >
                  <TableCell component="th" scope="row">
                    {result.test_name}
                  </TableCell>
                  <TableCell align="center">{result.total_correct}</TableCell>
                  <TableCell align="center">{result.total_questions - result.total_correct }</TableCell>
                  <TableCell align="center">{result.total_questions}</TableCell>
                  <TableCell align="center">{result.date_taken}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  );
};

export default Results;
