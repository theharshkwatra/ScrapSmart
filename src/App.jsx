import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Button from './components/Button/Button'
import HeroSection from './components/HeroSection/HeroSection'
import { FaRecycle, FaDollarSign } from 'react-icons/fa';
import { FiClock, FiZap, FiShield, FiTrendingUp } from 'react-icons/fi';
import ServiceCard from './components/ServiceCard/ServiceCard'
import FeatureCard from './components/FeatureCard/FeatureCard';
import Footer from './components/Footer/Footer'

function App() {

  return (
    <>
      <Navbar />
      <section className='main'>
        <HeroSection />
        <div className='start'>
          <Button label={"Get Started →"} color="rgb(0, 102, 255)" text="white" className="start-btn" />
          <Button label={"How It Works"} color="white" text="rgb(10, 22, 40)" className="start-btn" />
        </div>

        <div className="featureSection">
          <FeatureCard icon={<FaRecycle />} num="50K+" desc="Tons Recycled" />
          <FeatureCard icon={<FaDollarSign />} num="$10M+" desc="Paid to Sellers" />
          <FeatureCard icon={<FiClock />} num="24/7" desc="Support Available" />
        </div>
      </section>

      <section className='home-services'>
        <div className='service-content'>
          <h2> Why Choose <span className='imp'> ScrapSmart </span></h2>
          <p>We're revolutionizing the scrap industry with cutting-edge technology and unmatched service</p>
        </div>
        <div  className='serviceCard'>
          <ServiceCard serviceIcon={<FiZap />} serviceTitle="Instant Quotes" serviceContent="Get real-time pricing for your scrap materials with our AI-powered valuation system."/>
          <ServiceCard serviceIcon={<FiShield />} serviceTitle="Secure Transactions" serviceContent="Bank-grade security ensures your data and payments are always protected."/>
          <ServiceCard serviceIcon={<FiTrendingUp />} serviceTitle="Market Insights
" serviceContent="Stay ahead with live market rates and predictive analytics for scrap materials."/>
        </div>
      </section>

      <section className='footer-section'>
        <Footer />
      </section>

    </>
  )
}

export default App
