import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Quizzes',
  description: 'Store and allow users to take quizzes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ height: '100vh' ,background: 'linear-gradient(to top, #002984, #3f51b5)', overflow:'hidden' }}>
        {children}
      </body>
    </html>
  )
}
