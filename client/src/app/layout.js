import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quizzes",
  description: "Store and allow users to take quizzes",
};

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import theme from "../theme";
import Container from "@mui/material/Container";
export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        style={{
          height: "100vh",
          background: "linear-gradient(to top, #002984, #3f51b5)",
          overflow: "hidden",
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="sm">
            <Box
              sx={{
                bgcolor: "#ffffff",
                height: "80vh",
                // padding: "3%",
                marginTop: "12%",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflow: "auto",                
              }}              
              
            >
              {children}
            </Box>
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
