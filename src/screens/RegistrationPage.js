import React, { useState, useEffect } from "react";
import AdvocateRegistration from "../components/forms/AdvocateRegistration"
import JudgeRegistration from "../components/forms/JudgeRegistration";
import ClerkRegistration from "../components/forms/ClerkRegistration";
import ClientRegistration from "../components/forms/ClientRegistration";


import AdvocateDashboard from "../components/dashboards/AdvocateDashboard";
import JudgeDashboard from "../components/dashboards/JudgeDashboard";
import ClerkDashboard from "../components/dashboards/ClerkDashboard";
import ClientDashboard from "../components/dashboards/ClientDashboard";

import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/RegistrationPage.css";

const RegistrationPage = () => {
  const [userType, setUserType] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    setIsRegistered(false);
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    // You can also handle form validation and submission logic here
    setIsRegistered(true);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register As</h2>

      <div className="form-group">
        <label>Select Your Role</label>
        <select className="form-control" value={userType} onChange={handleUserTypeChange}>
          <option value="">-- Select Role --</option>
          <option value="Advocate">Advocate</option>
          <option value="Judge">Judge</option>
          <option value="Clerk">Clerk</option>
          <option value="Client">Client</option>
        </select>
      </div>

      {!isRegistered && userType && (
        <div className="registration-form mt-4">
          <form onSubmit={handleRegistrationSubmit}>
            {userType === "Advocate" && <AdvocateRegistration />}
            {userType === "Judge" && <JudgeRegistration />}
            {userType === "Clerk" && <ClerkRegistration />}
            {userType === "Client" && <ClientRegistration />}
            <button type="submit" className="btn btn-primary mt-4">Register</button>
          </form>
        </div>
      )}


      {isRegistered && (
        <div className="dashboard mt-5">
          {userType === "Advocate" && <AdvocateDashboard />}
          {userType === "Judge" && <JudgeDashboard />}
          {userType === "Clerk" && <ClerkDashboard />}
          {userType === "Client" && <ClientDashboard />}
        </div>
      )}

    </div>
  );
};

export default RegistrationPage;