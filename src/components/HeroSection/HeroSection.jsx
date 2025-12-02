import React from 'react'
import './HeroSection.css'
import icon from '../../assets/ScrapSmart-logo-icon.svg'
import truck from '../../assets/Recycle truck.svg'   

const HeroSection = () => {
    return (
        <div className='hero-container'>

            <div className='hero-left'>
                <div className='hero-btn'>
                    <img src={icon} alt="ScrapSmart Icon" className='btn-icon' />
                    <span className='btn-content'> Smart Scrap Management Platform </span>
                </div>

                <div className='hero-content'>
                    <h1 className='heading'>
                        Turn Your Scrap Into <span className='imp'>Cash</span>
                    </h1>

                    <p className='content'>
                        The most advanced platform for buying and selling scrap materials.
                        Get instant quotes, schedule pickups, and maximize your returns with ScrapSmart.
                    </p>
                </div>
            </div>

            <div className='hero-right'>
                <img src={truck} alt="Recycling Truck" className='truck-img' />
            </div>

        </div>
    )
}

export default HeroSection
