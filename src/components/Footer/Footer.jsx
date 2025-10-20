import React from 'react'
import Logo from '../Logo/Logo'
import './Footer.css'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";


const Footer = () => {
    return (
        <div className='footer'>
            <div className="left">
                <div className="socials-box">
                    <Logo className="footer-logo" />
                    <p className="left-content">Transforming the scrap industry with smart technology, transparent pricing, and sustainable practices.</p>
                    <div className='socials'>
                        <ul className='social-links'>
                            <li>
                                <a href="#" className="social-icon"><FaFacebookF /></a>
                            </li>
                            <li>
                                <a href="#" className="social-icon"><FaTwitter /></a>
                            </li>
                            <li>
                                <a href="#" className="social-icon"><FaInstagram /></a>
                            </li>
                            <li>
                                <a href="#" className="social-icon"><FaLinkedinIn /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
