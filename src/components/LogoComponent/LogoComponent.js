import React from 'react';
import { ReactComponent as LogoSVG } from './logo.svg'; // Import your SVG file
import './LogoComponent.css'; // Import the CSS file for styling

function LogoComponent() {
  return (
    <>
      <div className="logo-container">
        <LogoSVG className="logo" />
        <span className="brand-name">
          Silver Palms <br /> — Medical —
        </span>
      </div>
    </>
  );
}

export default LogoComponent;
