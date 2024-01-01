import React from 'react';
import { ReactComponent as LogoSVG } from './logo.svg'; // Import your SVG file
import './LogoComponent.css'; // Import the CSS file for styling

function LogoComponent() {
  return (
    <div className="logo-container">
      <LogoSVG className="logo" />
      <div className="brand-name">
        Silver Palms <br /> — Medical —
      </div>
    </div>
  );
}

export default LogoComponent;
