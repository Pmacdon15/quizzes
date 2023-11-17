import Link from 'next/link';
import theme from '../../src/theme';
import {Button} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export default function Home() {
  return (
    <main>
      <div className="container">
        <ThemeProvider theme={theme}>
          <CssBaseline />
        <h1>Quiz App</h1>
        <Link href="/quiz">
          <Button>Start Quiz</Button>
        </Link>
      </ThemeProvider>
      </div>
    </main>
  )
}
