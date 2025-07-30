import React from 'react'
import AppRouter from './router/AppRouter'
import LoadingSpinner from './features/auth/components/LoadingSpinner'

function App() {
  return (
    <>
      <LoadingSpinner />
      <AppRouter />
    </>
  )
}

export default App
