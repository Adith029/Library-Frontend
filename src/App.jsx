import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BookProvider } from './contexts/BookContext'
import Dashboard from './pages/Dashboard'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BookProvider>
      <QueryClientProvider client={queryClient}>
              <Toaster position="top-right" />

        <Dashboard />
      </QueryClientProvider>
    </BookProvider>
    </>
  )
}

export default App
