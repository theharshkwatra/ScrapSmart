import React from 'react'
import './Logo.css'
import icon from '../../assets/ScrapSmart-logo-icon.svg'
import text from '../../assets/ScrapSmart-logo-text.svg'

const Logo = () => {
    return (
        <div className='logo'>
            <a href="/">
                <img src={icon} alt="ScrapSmart Logo" className='logo-icon' />
                <img src={text} alt="ScrapSmart Logo" className='logo-text' />
            </a>
        </div>

    )
}

export default Logo
