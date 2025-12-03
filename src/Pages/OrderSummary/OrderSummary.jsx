import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./OrderSummary.css";
import { FaRupeeSign, FaCalendarAlt, FaClock, FaMapMarkerAlt} from "react-icons/fa";

const OrderSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { materials, quantities, estimatedValue } = location.state || {};

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [address, setAddress] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  useEffect(() => {
    setIsFormValid(
      selectedDate !== "" && selectedTime !== "" && address.trim() !== ""
    );
  }, [selectedDate, selectedTime, address]);

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime || !address.trim()) {
      alert("Please fill in all fields including address");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("user") || "{}");

    const booking = {
      id: Date.now().toString(),
      materials: quantities,
      estimatedValue: estimatedValue,
      date: selectedDate,
      time: selectedTime,
      address: address.trim(),
      customerName: userData.name || "Customer",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    navigate("/booking-confirmed", { state: { booking } });
  };

  if (!materials || !quantities) {
    return (
      <div className="order-summary-container">
        <div className="order-summary-content">
          <p>No order data found. Please go back and select materials.</p>
          <button onClick={() => navigate("/schedule-pickup")}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-summary-container">
      <div className="order-summary-content">
        <div className="order-header">
          <h1>Order Summary</h1>
          <p>Review your order and select pickup date & time</p>
        </div>

        <div className="order-details">
          <div className="order-section">
            <h2>Selected Materials</h2>
            <div className="materials-list">
              {Object.entries(materials).map(([id, material]) => (
                <div key={id} className="material-item">
                  <div className="material-info">
                    <h4>{material.name}</h4>
                    <p>
                      {quantities[id]} kg × ₹{material.pricePerKg}/kg
                    </p>
                  </div>
                  <div className="material-value">
                    ₹{(quantities[id] * material.pricePerKg).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-section">
            <div className="estimated-value-card">
             <div>
                <h3>Estimated Value</h3>
                <p className="value-amount">₹{estimatedValue.toFixed(0)}</p>
              </div>
            </div>
          </div>

          <div className="order-section">
            <h2>Select Pickup Date & Time</h2>
            <div className="datetime-selectors">
              <div className="date-selector">
                <label htmlFor="pickup-date">
                  <FaCalendarAlt />
                  Pickup Date
                </label>
                <input
                  type="date"
                  id="pickup-date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={getMinDate()}
                  required
                />
              </div>

              <div className="time-selector">
                <label htmlFor="pickup-time">
                  <FaClock />
                  Pickup Time
                </label>
                <input
                  type="time"
                  id="pickup-time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="order-section">
            <h2>Pickup Address</h2>
            <div className="address-selector">
              <label htmlFor="pickup-address">
                <FaMapMarkerAlt />
                Address
              </label>
              <textarea
                id="pickup-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your pickup address"
                rows="3"
                required
              />
            </div>
          </div>
        </div>

        <div className="order-actions">
          <button
            className="back-btn"
            onClick={() => navigate("/schedule-pickup")}
          >
            ← Back
          </button>
          <button
            className="confirm-btn"
            onClick={handleConfirm}
            disabled={!isFormValid}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
