// src/components/LoadingSpinner/LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading countries...</p>
    </div>
  );
};

export default LoadingSpinner;
