import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
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

export default App