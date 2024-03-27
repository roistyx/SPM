import React from 'react';
import { ReactComponent as LogoSVG } from './logo.svg'; // Import your SVG file
import './LogoComponent.css'; // Import the CSS file for styling

function LogoComponent() {
  return (
    <div className="logo-container">
      <img src={'Logo.png'} alt="Logo" />
    </div>
  );
}

export default LogoComponent;
