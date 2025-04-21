import React from 'react';
import '../styles/SplashScreen.css';
import logo from '../images/Empowering Justice with AI-driven Insights.png'; // Adjust the path as needed

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <img 
        src={logo} 
        alt="Justiflow Logo" 
        className="logo"
      />
      <h1 className="tagline">Empowering Justice with AI-driven Insights</h1>
    </div>
  );
};

export default SplashScreen;
