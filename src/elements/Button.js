import React from 'react';
import './Button.css';

function Button({
  text,
  isDisabled,
  children,
  onClick,
  addClass,
  buttonPadding,
  buttonContainerMargin,
}) {
  const buttonStyle = {
    ...(buttonContainerMargin
      ? { '--button-container-margin': buttonContainerMargin }
      : {}),
    ...(buttonPadding ? { padding: buttonPadding } : {}),
  };
  const classes = `styled-button ${addClass || ''}`;
  return (
    <button
      // className={classes}
      // style={buttonStyle}
      className="styled-button"
      onClick={onClick}
      disabled={isDisabled}
      data-text={text}
    >
      {text}
    </button>
  );
}

export default Button;
