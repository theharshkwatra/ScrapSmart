import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import Services from './Pages/Services/Services';
import About from './Pages/About/About';
import HowItWorks from './Pages/HowItWorks/HowItWorks';
import './App.css'

import Navbar from './components/Navbar/Navbar';
import ServiceTile from './components/ServiceTile/ServiceTile';
import servicesData from './data/servicesData'
import MaterialCard from './components/MaterialCard/MaterialCard';
import materialsData from './data/materialsData'
import ServiceKeypoints from './components/ServiceKeypoints/ServiceKeypoints';
import keypointsData from './data/keypointsData';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;