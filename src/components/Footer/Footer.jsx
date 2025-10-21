import React from 'react'
import Logo from '../Logo/Logo'
import './Footer.css'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaRecycle } from 'react-icons/fa'



const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-content">
                <Logo className="footer-logo" />
                <p className="footer-text">Transforming the scrap industry with smart technology, transparent pricing, and sustainable practices.</p>
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

                    <hr className='footer-line' />
                    <div className="copyright">
                        <p> &copy; ScrapSmart. All rights reserved. <span> &bull; </span> Made with <FaRecycle className="recycle-icon"/> for a sustainable future</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
