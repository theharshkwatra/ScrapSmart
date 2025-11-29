import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'
import Button from '../Button/Button'
import Logo from '../Logo/Logo'


const Navbar = () => {
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'How It Works', to: '/how-it-works' }
  ];

  return (
    <div>
      <nav className='navbar'>
        <Logo />
        <div className='navbar-links'>
          {navItems.map(item => (
            <NavLink key={item.label} to={item.to} end className={({ isActive }) => isActive ? 'navlink active' : 'navlink'}>
              {({ isActive }) => (
                <Button
                  label={item.label}
                  active={isActive}
                />
              )}
            </NavLink>
          ))}
          <Link to="/services" className="navlink get-started-link">
            <Button
              label="Get Started"
              color="white"
              text="rgba(0, 102, 255, 1)"
            />
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
