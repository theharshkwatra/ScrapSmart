import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Services from "./Pages/Services/Services";
import HowItWorks from "./Pages/HowItWorks/HowItWorks";
import RoleSelect from "./Pages/RoleSelect/RoleSelect";
import Auth from "./Pages/Auth/Auth";
import Dashboard from "./Pages/Dashboard/Dashboard";
import CollectorDashboard from "./Pages/CollectorDashboard/CollectorDashboard";
import SchedulePickup from "./Pages/SchedulePickup/SchedulePickup";
import OrderSummary from "./Pages/OrderSummary/OrderSummary";
import BookingConfirmed from "./Pages/BookingConfirmed/BookingConfirmed";
import AcceptConfirmed from "./Pages/AcceptConfirmed/AcceptConfirmed";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
// import ServiceTile from "./components/ServiceTile/ServiceTile";
// import servicesData from "./data/servicesData";
// import MaterialCard from "./components/MaterialCard/MaterialCard";
// import materialsData from "./data/materialsData";
// import ServiceKeypoints from "./components/ServiceKeypoints/ServiceKeypoints";
// import keypointsData from "./data/keypointsData";
// import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/role-select" element={<RoleSelect />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/collector-dashboard" element={<CollectorDashboard />} />
          <Route path="/schedule-pickup" element={<SchedulePickup />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/booking-confirmed" element={<BookingConfirmed />} />
          <Route path="/accept-confirmed" element={<AcceptConfirmed />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
