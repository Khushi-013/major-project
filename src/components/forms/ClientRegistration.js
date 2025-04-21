// components/forms/ClientRegistration.js
import React from "react";
import './forms.css';

const ClientRegistration = () => (
  <div className="form-container">
    <h3>Client Registration</h3>
    <div className="form-group">
      <label>Name</label>
      <input type="text" className="form-control" required />
    </div>
    <div className="form-group">
      <label>Client ID</label>
      <input type="text" className="form-control" required />
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

export default ClientRegistration;
