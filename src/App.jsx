import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
// import AboutPage from './pages/AboutPage'; // A new page you'll create
// import ServicesPage from './pages/ServicesPage'; // Another new page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;