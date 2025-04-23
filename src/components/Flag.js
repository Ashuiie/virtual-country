
import React from 'react';
import './Flag.css';

const Flag = ({ url, alt }) => {
  return (
    <div className="flag-container">
      <img src={url} alt={alt} className="flag-image" />
    </div>
  );
};

export default Flag;
