import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Button from './components/Button/Button'
import HeroSection from './components/HeroSection/HeroSection'
import { FaRecycle, FaDollarSign } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';
import FeatureCard from './components/FeatureCard/FeatureCard';

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

      <section>
        
      </section>


    </>
  )
}

export default App
