import React from 'react';
import { useState } from 'react';
import './Button.css';

const Button = (props) => {
  const [isHovered, setisHovered] = useState(false);

  const baseColor = props.color || 'transparent';
  const hoverColor = 'rgba(255, 255, 255, 0.1)';
  const clickColor = 'rgba(255, 255, 255, 0.3)';

  const currentColor = props.active ? clickColor : isHovered ? hoverColor : baseColor;
  return (
    <button
      className={`btn ${props.className || ''}`}
      style={{ 
        
        backgroundColor: currentColor, 
        color: props.text || 'white',
        transition: 'backgroundColor 0.5s',
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        opacity: props.disabled ? 0.5 : 1
      }}

      onMouseEnter={() => !props.disabled && setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
      onClick={props.disabled ? undefined : props.onClick}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
};

export default Button;
