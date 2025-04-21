// components/forms/JudgeRegistration.js
import React from "react";
import './forms.css';

const JudgeRegistration = () => (
  <div className="form-container">
    <h3>Judge Registration</h3>
    <div className="form-group">
      <label>Name</label>
      <input type="text" className="form-control" required />
    </div>
    <div className="form-group">
      <label>Judicial ID</label>
      <input type="text" className="form-control" required />
    </div>
    <div className="form-group">
      <label>Court Type</label>
      <select className="form-control" required>
        <option value="high">High Court</option>
        <option value="district">District Court</option>
        <option value="civil">Civil Court</option>
        <option value="family">Family Court</option>
      </select>
    </div>
    <div className="form-group">
      <label>Experience (Years)</label>
      <input type="number" className="form-control" required />
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

export default JudgeRegistration;
