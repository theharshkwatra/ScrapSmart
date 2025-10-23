import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
// import AboutPage from './pages/AboutPage'; // A new page you'll create
// import ServicesPage from './pages/ServicesPage'; // Another new page
import Navbar from './components/Navbar/Navbar';
import './App.css'
import ServiceTile from './components/ServiceTile/ServiceTile';

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

      <section>
        <div className='services-box'>
          <h1 className='services-heading'> Our <span className='imp'> Services </span> </h1>
          <p className='services-content'> Comprehensive scrap management solutions designed to make recycling simple, profitable, and environmentally responsible. </p>
        </div>

        <div className='services'>
          <ServiceTile />
        </div>
      </section>
    </>
  );
}

export default App;