// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // reuse your existing footer CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About / Branding */}
        <div className="footer-about">
          <h3>Hotel Booking System</h3>
          <p>
            Book hotels, resorts, and rooms at the best prices with comfort and
            convenience. Experience luxury and hassle-free booking all in one
            place.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/hotels">Hotels</Link>
            </li>
            
            <li>
              <Link to="/services"> Services</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Policies / Company */}
        <div className="footer-links">
          <h4>Policies</h4>
          <ul>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Hotel Booking System. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
