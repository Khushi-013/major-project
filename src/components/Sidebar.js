// components/common/Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = () => (
  <div className="sidebar">
    <h2>Justiflow</h2>
    <ul>
      <li><a href="#">Dashboard</a></li>
      <li><a href="#">Cases</a></li>
      <li><a href="#">Clients</a></li>
      <li><a href="#">Settings</a></li>
    </ul>
  </div>
);

export default Sidebar;
