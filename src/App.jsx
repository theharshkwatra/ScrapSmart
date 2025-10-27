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
            <div className='materials-content'>
              <h2 className='materials-heading'>Materials We Accept</h2>
              <p className='materials-desc'>We handle a wide range of recyclable materials with expertise and care</p>
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
          </div>
        </section>

        <section className='unique-service'>
          <div className='unique-service-content'>
            <img src="" alt="scrap" />
            <h2>Why Our Services Stand Out</h2>
            
          </div>
        </section>
      </div>
    </>
  );
}

export default App;