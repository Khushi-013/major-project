import React, { useState } from "react";
import '../styles/ForgotPassword.css'; // Make sure to create a CSS file for styling

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to request a password reset
    // For now, let's just simulate success
    setMessage("If an account with that email exists, a password reset link will be sent.");
    setEmail("");
  };

  return (
    <div className="forgot-password-container">
      <h2 className="text-center">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="form-control"
            placeholder="Enter your email"
          />
        </div>
        <button type="submit" className="btn btn-primary">Send Reset Link</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
