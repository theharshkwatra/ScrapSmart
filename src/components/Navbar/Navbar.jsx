import React from 'react'
import { useState } from 'react'
import './Navbar.css'
import Button from '../Button/Button'
import icon from '../../assets/ScrapSmart-logo-icon.svg'
import text from '../../assets/ScrapSmart-logo-text.svg'

const Navbar = () => {
  const [activeButton, setActiveButton] = useState('Home')
  const buttons = ["Home", "About", "Services", "How It Works", "Contact", "Get Started"];

  return (
    <div>
      <nav className='navbar'>
        <div className='navbar-logo'>
          <a href="/">
            <img src={icon} alt="ScrapSmart Logo" className='logo-icon' />
            <img src={text} alt="ScrapSmart Logo" className='logo-text' />
          </a>
        </div>
        <div className='navbar-links'>
          {buttons.map(btn => (
            <Button
              key={btn}
              label={btn}
              active={activeButton === btn}
              color={btn === "Get Started" ? "white" : undefined}
              text={btn === "Get Started" ? "rgba(0, 102, 255, 100)" : undefined}
              onClick={() => setActiveButton(btn)}
            />
          ))}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
