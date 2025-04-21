import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Import the CSS
//import Header from '../components/Header';
//import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left side with image */}
        <div className="login-left">
          <img src="https://getlegalindia.com/wp-content/uploads/2023/10/advocate-act-img-410x273.jpg" alt="Login visual" />
        </div>

        {/* Right side with login form */}
        <div className="login-right">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign In</button>

            <div className="additional-options">
              <a href="/forgot-password">Forgot Password?</a>
              <a href="/register">Create an account</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
