import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Button from './components/Button/Button'
import HeroSection from './components/HeroSection/HeroSection'
import { FaRecycle, FaDollarSign } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';
import './components/FeatureCard/FeatureCard';


function App() {

  return (
    <>
      <Navbar />
      <section className='main'>
        <HeroSection />
        <div className='start'>
          <Button label={"Get Started →"} color="rgba(0, 102, 255, 100)" text="white" className="start-btn" />
          <Button label={"How It Works"} color="white" text="rgb(10, 22, 40)" className="start-btn" />
        </div>
      </section>


    </>
  )
}

export default App
