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
        transition: 'backgroundColor 0.5s'
      }}

      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};

export default Button;
