import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.css'
import icon from '../../assets/ScrapSmart-logo-icon.svg'
import text from '../../assets/ScrapSmart-logo-text.svg'

const Logo = () => {
    return (
        <div className='logo'>
            <Link to="/">
                <img src={icon} alt="ScrapSmart Logo" className='logo-icon' />
                <img src={text} alt="ScrapSmart Logo" className='logo-text' />
            </Link>
        </div>

    )
}

export default Logo
