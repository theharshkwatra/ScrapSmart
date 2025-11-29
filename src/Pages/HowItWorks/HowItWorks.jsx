import React from 'react';
import './HowItWorks.css';
import { FaCamera, FaTruck, FaMoneyBillWave } from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';
import Footer from '../../components/Footer/Footer';

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Upload Photos',
      description: 'Take photos of your scrap materials using our mobile app or website. Include different angles for accurate assessment.',
      points: ['Multiple angle photos', 'Material categorization', 'Quantity estimation'],
      icon: <FaCamera />
    },
    {
      number: '02',
      title: 'Get Instant Quote',
      description: 'Our AI analyzes your materials and provides a real-time quote based on current market rates and material quality.',
      points: ['AI-powered valuation', 'Market rate matching', 'Transparent pricing'],
      icon: <FiFileText />
    },
    {
      number: '03',
      title: 'Schedule Pickup',
      description: 'Choose a convenient time for pickup. Our logistics team will come to your location with all necessary equipment.',
      points: ['Flexible scheduling', 'GPS tracked vehicles', 'Professional handling'],
      icon: <FaTruck />
    },
    {
      number: '04',
      title: 'Get Paid',
      description: 'After verification and weighing, receive instant payment through your preferred method. Simple, fast, and secure.',
      points: ['Multiple payment options', 'Instant settlement', 'Digital receipts'],
      icon: <FaMoneyBillWave />
    }
  ];

  return (
    <>
      <section className="howitworks-hero">
        <div className="howitworks-header">
          <h1 className="howitworks-title">How <span className="imp">It Works</span></h1>
          <p className="howitworks-subtitle">
            From quote to payment in just 4 simple steps. Experience the easiest way to turn your scrap into cash.
          </p>
        </div>
      </section>

      <section className="howitworks-steps">
        {steps.map((step, index) => (
          <div key={index} className={`step-container ${index % 2 === 1 ? 'step-reverse' : ''}`}>
            <div className="step-content">
              <div className="step-badge">Step {step.number}</div>
              <div className="step-header">
                <div className="step-icon-box">
                  <div className="step-icon">{step.icon}</div>
                </div>
                <h2 className="step-title">{step.title}</h2>
              </div>
              <p className="step-description">{step.description}</p>
              <ul className="step-points">
                {step.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="step-visual">
              <div className="step-visual-card">
                <div className="step-visual-circle">
                  <div className="step-visual-icon">{step.icon}</div>
                  <div className="step-visual-badge">{step.number}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="footer-section">
        <Footer />
      </section>
    </>
  );
}

export default HowItWorks;
