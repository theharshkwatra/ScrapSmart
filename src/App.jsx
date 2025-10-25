import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
// import AboutPage from './pages/AboutPage'; // A new page you'll create
// import ServicesPage from './pages/ServicesPage'; // Another new page
import './App.css'

import Navbar from './components/Navbar/Navbar';
import ServiceTile from './components/ServiceTile/ServiceTile';
import servicesData from './data/servicesData'
import MaterialCard from './components/MaterialCard/MaterialCard';
import materialsData from './data/materialsData'


function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<HomePage />} />
    //     {/* <Route path="/about" element={<AboutPage />} />
    //     <Route path="/services" element={<ServicesPage />} /> */}
    //   </Routes>
    // </BrowserRouter>
    <>
      <Navbar />
      <div>
        <section>
          <div className='services-box'>
            <h1 className='services-heading'> Our <span className='imp'> Services </span> </h1>
            <p className='services-content'> Comprehensive scrap management solutions designed to make recycling simple, profitable, and environmentally responsible. </p>
          </div>

          <div className='services-grid'>
            {servicesData.map((service) => (
              <ServiceTile
                key={service.title}
                icon={service.icon}
                title={service.title}
                content={service.content}
                points={service.points}
              />
            ))}
          </div>
        </section>

        <section className='materials-section'>
          <div className='materials-box'>
            <h2>Materials We Accept</h2>
            <p>We handle a wide range of recyclable materials with expertise and care</p>
          </div>

          <div className='materials-list'>
            {materialsData.map((material) => (
              <MaterialCard 
              key={material.title}
              title={material.title}
              desc={material.desc}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default App;