// components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdvocateDashboard from '../components/dashboards/AdvocateDashboard';
import JudgeDashboard from '../components/dashboards/JudgeDashboard';
import ClerkDashboard from '../components/dashboards/JudgeDashboard';
import ClientDashboard from '../components/dashboards/ClientDashboard';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/Dashboard.css';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the user role from localStorage or context
    const role = localStorage.getItem('userRole');
    if (!role) {
      // If no role found, redirect to the login page or registration
      navigate('/login');
    } else {
      setUserRole(role);
    }
  }, [navigate]);

  // Function to render the specific dashboard based on user type
  const renderDashboard = () => {
    switch (userRole) {
      case 'advocate':
        return <AdvocateDashboard />;
      case 'clerk':
        return <ClerkDashboard />;
      case 'judge':
        return <JudgeDashboard />;
      case 'client':
        return <ClientDashboard />;
      default:
        return <p>No Dashboard available for this user type.</p>;
    }
  };

  return (
    
    <div className="dashboard">
      <Header />
      <Sidebar />
      <div className="main-content">
        
        {renderDashboard()}
        
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
