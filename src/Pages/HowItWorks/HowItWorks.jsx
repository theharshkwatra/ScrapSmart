import React from 'react';
import './HowItWorks.css';
import { FaCamera, FaTruck, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';
import earning from '../../assets/earning.png';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

function HowItWorks() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/services');
  };

  const customerFeatures = [
    {
      title: 'No Hidden Fees',
      description: 'What you see is what you get. Transparent pricing with no surprises.'
    },
    {
      title: 'Same Day Service',
      description: 'Quick turnaround from quote to payment, often within 24 hours.'
    },
    {
      title: 'Eco-Friendly',
      description: 'All materials are responsibly recycled with minimal environmental impact.'
    },
    {
      title: 'Professional Team',
      description: 'Trained experts handle your materials with care and expertise.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Schedule Pickup',
      description: 'Choose a convenient time for pickup. Our logistics team will come to your location with all necessary equipment.',
      points: ['Flexible scheduling','Professional handling'],
      icon: <FaTruck />
    },
    {
      number: '02',
      title: 'Get Paid',
      description: 'After verification and weighing, receive instant payment through your preferred method. Simple, fast, and secure.',
      points: ['Multiple payment options', 'Instant settlement'],
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

      <section className="why-customers-love">
        <div className="why-customers-content">
          <h2 className="why-customers-title">Why Customers Love Us</h2>
          <p className="why-customers-subtitle">The ScrapSmart advantage goes beyond just buying and selling scrap</p>
          <div className="customer-cards-grid">
            {customerFeatures.map((feature, index) => (
              <div key={index} className="customer-card">
                <div className="customer-card-icon">
                  <FaCheckCircle />
                </div>
                <h3 className="customer-card-title">{feature.title}</h3>
                <p className="customer-card-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="start-earning-section">
        <div className="start-earning-container">
          <div className="start-earning-content">
            <h2 className="start-earning-title">Start Earning Today</h2>
            <p className="start-earning-text">Join thousands of satisfied customers who have discovered the smartest way to handle their scrap materials.</p>
            <ul className="start-earning-points">
              <li>
                <FaCheckCircle className="check-icon" />
                <span>Free account setup</span>
              </li>
              <li>
                <FaCheckCircle className="check-icon" />
                <span>No minimum quantities</span>
              </li>
              <li>
                <FaCheckCircle className="check-icon" />
                <span>24/7 customer support</span>
              </li>
            </ul>
          </div>
          <div className="start-earning-image">
            <img src={earning} alt="Urban landscape with highways" />
          </div>
        </div>
      </section>

      <section className="footer-section">
        <Footer />
      </section>
    </>
  );
}

export default HowItWorks;
