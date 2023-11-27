import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import theme from "../../../src/theme";
import Container from "@mui/material/Container";


const Index = () => {
  const quizSlugs = ['Math', 'Places', 'Shapes'];

  return (    
    <div className="container">
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
          <h1>Choose a Quiz</h1>
          {quizSlugs.map((slug) => (
            <Link key={slug} href={`/questions/${encodeURIComponent(slug)}`} passHref>
              {/* Pass the test name as a parameter in the URL */}
              <Button variant="contained" color="primary" style={{ margin: '5px' }}>
                {slug}
              </Button>
            </Link>
          ))}
        </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Index;
