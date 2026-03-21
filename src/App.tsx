import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import Dashboard from './pages/dashboard'
import AuthPages from './pages/authPage'
import LandingPage from "./pages/landingPage"
import NotFoundPage from "./pages/notFoundPage"
import AboutPage from "./pages/aboutPage"
import ProtectedRouter from "./components/ProtectedRoute"
import './App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <BrowserRouter>
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: isDarkMode ? 'rgba(28, 28, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            color: isDarkMode ? '#F5F5F7' : '#1D1D1F',
            border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
            borderRadius: '100px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: 500,
          },
          success: {
            iconTheme: {
              primary: isDarkMode ? '#0A84FF' : '#0066CC',
              secondary: isDarkMode ? '#1C1C1E' : '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#FF453A',
              secondary: isDarkMode ? '#1C1C1E' : '#FFFFFF',
            },
          },
        }} 
      />

      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/login" element={<AuthPages isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/" element={<LandingPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/about" element={<AboutPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* --- Protected Routes --- */}
        <Route element={<ProtectedRouter />}>
          <Route path="/dashboard" element={<Dashboard isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;