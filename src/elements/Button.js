import React from 'react';
import './Button.css';

function Button({
  text,
  isDisabled,
  children,
  onClick,
  addClass,
  additionalStyles,
}) {
  const buttonStyle = {
    ...additionalStyles,
  };
  const classes = `styled-button ${addClass || ''}`;
  return (
    <button
      className={classes}
      style={buttonStyle}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text || children}
    </button>
  );
}

export default Button;
