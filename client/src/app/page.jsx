'use client'
import Link from 'next/link';
import theme from '../../src/theme';
import {Button} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import * as React from "react";
import { useForm } from "react-hook-form";

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
        <h1>Quiz App</h1>
        <Link href="/quiz">
          <Button variant="contained" color="primary" style={{ margin: '5px' }}>Get Started</Button>
        </Link>
        </Box>
        </Container>
      </ThemeProvider>
      </div>
    </main>
  )
}
