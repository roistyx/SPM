import React from 'react';
import './ColorTheme.css';
import DummyTextComponent from './DummyTextComponent.js';

function ColorTheme() {
  const colorVariableNames = [
    'primary',
    'secondary',
    'accent',
    'text',
    'textSecondary',
    'link',
    'dark',
    'light',
    'unknown',
  ];

  //   console.log('colorVariableNames', chroma('#EF7D8D').name());

  return (
    <div>
      <div className="theme-container">
        {colorVariableNames.map((name, index) => (
          <div
            key={index}
            className="color-box"
            style={{ backgroundColor: `var(--color-${name})` }}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}{' '}
            {/* Capitalize the name */}
          </div>
        ))}
      </div>
      <DummyTextComponent />
    </div>
  );
}

export default ColorTheme;
