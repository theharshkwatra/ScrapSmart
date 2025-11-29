import React from 'react';
import './About.css';
import Footer from '../../components/Footer/Footer';
import img from '../../assets/ScrapSmart.svg';
import { FaBullseye, FaUsers, FaAward, FaGlobe } from 'react-icons/fa';

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-inner">
          <div className="about-text">
            <h1 className="about-title">About <span className="cursive">ScrapSmart</span></h1>
            <p className="about-lead">We're not just a scrap management platform — we're your partners in building a sustainable future. Since 2020, we've been transforming how businesses and individuals handle recyclable materials.</p>
            <p className="about-lead">With cutting-edge technology, transparent pricing, and a commitment to environmental responsibility, we make recycling profitable and easy.</p>
          </div>
          <div className="about-image-wrap">
            <img src={img} alt="ScrapSmart" className="about-image" />
          </div>
        </div>
      </section>

      <section className="core-values">
        <h2 className="values-heading">Our Core Values</h2>
        <p className="values-sub">The principles that guide everything we do</p>

        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon"><FaBullseye /></div>
            <h3>Our Mission</h3>
            <p>To revolutionize the scrap industry by making recycling accessible, profitable, and environmentally responsible for everyone.</p>
          </div>

          <div className="value-card">
            <div className="value-icon"><FaUsers /></div>
            <h3>Our Team</h3>
            <p>A diverse group of industry experts, tech innovators, and sustainability advocates working together for a greener future.</p>
          </div>

          <div className="value-card">
            <div className="value-icon"><FaAward /></div>
            <h3>Excellence</h3>
            <p>Committed to delivering exceptional service, fair pricing, and innovative solutions that exceed expectations.</p>
          </div>

          <div className="value-card">
            <div className="value-icon"><FaGlobe /></div>
            <h3>Global Impact</h3>
            <p>Operating across multiple regions to create a worldwide network of sustainable scrap management.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
