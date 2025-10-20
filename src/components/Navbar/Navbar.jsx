import React from 'react'
import { useState } from 'react'
import './Navbar.css'
import Button from '../Button/Button'
import Logo from '../Logo/Logo'


const Navbar = () => {
  const [activeButton, setActiveButton] = useState('Home')
  const buttons = ["Home", "About", "Services", "How It Works", "Contact", "Get Started"];

  return (
    <div>
      <nav className='navbar'>
        <Logo />
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
