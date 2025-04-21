// components/forms/ClerkRegistration.js
import React from "react";
import './forms.css';

const ClerkRegistration = () => (
  <div className="form-container">
    <h3>Clerk Registration</h3>
    <div className="form-group">
      <label>Name</label>
      <input type="text" className="form-control" required />
    </div>
    <div className="form-group">
      <label>Clerk ID</label>
      <input type="text" className="form-control" required />
    </div>
    <div className="form-group">
      <label>Court Assigned</label>
      <select className="form-control" required>
        <option value="high">High Court</option>
        <option value="district">District Court</option>
        <option value="civil">Civil Court</option>
        <option value="family">Family Court</option>
      </select>
    </div>
    <div className="form-group">
      <label>Years of Service</label>
      <input type="number" className="form-control" required />
    </div>
    <div className="form-group">
      <label>Email</label>
      <input type="email" className="form-control" required />
    </div>
    <div className="form-group">
      <label>Password</label>
      <input type="password" className="form-control" required />
    </div>
  </div>
);

export default ClerkRegistration;
