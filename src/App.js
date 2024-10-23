import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashScreen from './screens/SplashScreen';
import LandingPage from './screens/LandingPage';
import Login from './screens/Login';
import RegistrationPage from './screens/RegistrationPage';
import Dashboard from './screens/Dashboard';
import ForgotPassword from './screens/ForgotPassword';
import CasesPage from './screens/CasesPage';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Timeout to hide splash screen and show the landing page
    const timer = setTimeout(() => {
      setShowSplash(false); // After 3 seconds, hide splash screen
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer when component unmounts
  }, []);

  return (
    <Router>
      <div className="App">
        {showSplash ? (
          <SplashScreen /> // Show splash screen if showSplash is true
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage />} /> {/* Show landing page after splash screen */}
            <Route path="/login" element={<Login />} /> {/* Corrected: Use <Route> instead of <Router> */}
            <Route path="/register" element={<RegistrationPage />} /> {/* Corrected: Use <Route> instead of <Router> */}
            <Route path ="/dashboard" element={<Dashboard/>} />
            <Route path = "/forgot-password" element={<ForgotPassword/>} />
            <Route path = "/cases" element={<CasesPage/>} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
