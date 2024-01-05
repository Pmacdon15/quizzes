import Link from "next/link";
import theme from "../../../theme";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function menuAdmin({ params }) {
  const userEmail = decodeURIComponent(params.user_email);  
  return (
    <main>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
              <h1>Quiz App</h1>
              <Link href={`/quiz/${userEmail}`}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "5px" }}
                >
                  Get Started
                </Button>
              </Link>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </main>
  );
}




// import Link from 'next/link';
// import theme from '../../../theme';
// import {Button} from '@mui/material';
// import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";

// export default function index() {
//   return (
//     <main>
//       <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//         <ThemeProvider theme={theme}>
//           <CssBaseline />
//           <Container maxWidth="sm">
//         <Box
//           sx={{
//             bgcolor: "#ffffff",
//             height: "80vh",
//             padding: "3%",
//             marginTop: "12%",
//             borderRadius: "10px",
//             display: 'flex', flexDirection: 'column', alignItems: 'center'
//           }}
//         >
//         <h1>Quiz App</h1>
//         <Link href="/quiz">
//           <Button variant="contained" color="primary" style={{ margin: '5px' }}>Get Started</Button>
//         </Link>
//         </Box>
//         </Container>
//       </ThemeProvider>
//       </div>
//     </main>
//   )
// }
