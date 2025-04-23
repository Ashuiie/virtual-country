
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p>Data provided by REST Countries API</p>
          <p>&copy; {new Date().getFullYear()} Country Information. All rights reserved.</p>
        </div>
        <div className="footer-links">
          <a 
            href="https://github.com/your-username/visualizing-country-information" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a 
            href="https://restcountries.com/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            API Documentation
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
