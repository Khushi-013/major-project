// components/forms/AdvocateRegistration.js
import React from "react";
import './forms.css';

const AdvocateRegistration = () => (
  <div className="form-container">
    <h3>Advocate Registration</h3>
    <div className="form-group">
      <label>Name</label>
      <input type="text" className="form-control" required />
    </div>
    <div className="form-group">
      <label>Bar ID</label>
      <input type="text" className="form-control" required />
    </div>
    <div className="form-group">
      <label>Designation</label>
      <input type="text" className="form-control" required />
    </div>
    <div className="form-group">
      <label>Specialization (Type of Cases)</label>
      <select className="form-control" required>
        <option value="criminal">Criminal Law</option>
        <option value="civil">Civil Law</option>
        <option value="corporate">Corporate Law</option>
        <option value="family">Family Law</option>
        <option value="property">Property Law</option>
        <option value="other">Other</option>
      </select>
    </div>
    <div className="form-group">
      <label>Highest Qualification</label>
      <input type="text" className="form-control" required />
    </div>
    <div className="form-group">
      <label>Profile Photo</label>
      <input type="file" className="form-control" required />
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

export default AdvocateRegistration;
