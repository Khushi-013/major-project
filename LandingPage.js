import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageSlider from '../components/ImageSlider';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'; // Social Media Icons
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <Header />

      <ImageSlider />

      {/* Introduction Section */}
      <section className="intro-section">
        <div className="intro-content">
          <h1>Welcome to Justiflow !</h1>
          <p>Empowering justice with AI-driven insights for streamlined case management.</p>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="features-section">
        <h2 className="features-title">Key Features</h2>
        <div className="features-cards">
          <div className="feature-card">
            <h3>Case Prioritization</h3>
            <p>Automatically rank cases based on complexity, importance, and timeline urgency.</p>
          </div>
          <div className="feature-card">
            <h3>Timeline Prediction</h3>
            <p>Forecast the expected duration of each case based on historical data and AI algorithms.</p>
          </div>
          <div className="feature-card">
            <h3>Legal Document Management</h3>
            <p>Store, categorize, and retrieve legal documents effortlessly with advanced search features.</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us-section">
        <h2>About Justiflow </h2>
        <p>Justiflow is a cutting-edge court case management system designed to bring transparency,
          efficiency, and AI-powered insights to legal workflows. Our system prioritizes case timelines,
          ensures document management security, and provides predictive analytics to forecast case outcomes.
        </p>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h1>Our Services</h1>
        <div className="services-list">
          <div className="service-item">
            <h3>Distributed Case Flow Management</h3>
            <p>Manage case lifecycles with distributed tracking and real-time updates.</p>
          </div>
          <div className="service-item">
            <h3>Data-Driven Case Analysis</h3>
            <p>Analyze case data to improve resolution times and optimize case outcomes.</p>
          </div>
          <div className="service-item">
            <h3>Secure Legal Solutions</h3>
            <p>Ensure complete security and confidentiality of sensitive legal documents and case data.</p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="contact-section">
        <div className="contact-container">
          {/* Left Side: Contact Info inside a container */}
          <div className="left-container">
            <div className="contact-info">
              <p>If you have any questions or need assistance, feel free to reach out to us!</p>
              <h3>Contact Us:</h3>
              <p>Email: support@justiflow.com</p>
              <p>Phone: +1 234 567 8901</p>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="right-container">
            <h3>Get In Touch</h3>
            <form className="contact-form">
              <div className="email-container">
                <input type="email" placeholder="Your Email" className="email-input" required />
                <button type="submit" className="submit-button">Submit</button>
              </div>
            </form>
            <div className="social-links">
              <h4>Follow Us:</h4>
              <a href="#" className="social-icon"><FaFacebook /></a>
              <a href="#" className="social-icon"><FaTwitter /></a>
              <a href="#" className="social-icon"><FaLinkedin /></a>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
