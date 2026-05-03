import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BookingConfirmed.css";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaClock,
  FaRupeeSign,
} from "react-icons/fa";

const BookingConfirmed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking;

  useEffect(() => {}, [booking]);

  if (!booking) {
    return (
      <div className="booking-confirmed-container">
        <div className="booking-confirmed-content">
          <p>No booking found. Redirecting...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  return (
    <div className="booking-confirmed-container">
      <div className="booking-confirmed-content">
        <div className="success-icon">
          <FaCheckCircle />
        </div>
        <h1>Booking Confirmed!</h1>
        <p className="confirmation-message">
          Your pickup has been scheduled successfully. We'll be there on time!
        </p>

        <div className="booking-details-card">
          <div className="booking-id-badge">
            ID: {booking._id?.toString().substring(0, 12).toUpperCase() || "N/A"}
          </div>
          <h2>Booking Details</h2>

          <div className="detail-item">
            <FaCalendarAlt />
            <div>
              <span className="detail-label">Pickup Date</span>
              <span className="detail-value">{formatDate(booking.scheduledDate)}</span>
            </div>
          </div>

          <div className="detail-item">
            <FaClock />
            <div>
              <span className="detail-label">Pickup Time</span>
              <span className="detail-value">{formatTime(booking.timeSlot)}</span>
            </div>
          </div>

          <div className="detail-item">
            <FaRupeeSign />
            <div>
              <span className="detail-label">Estimated Weight</span>
              <span className="detail-value">
                {booking.estimatedWeight} kg
              </span>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <button
            className="dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
          <button
            className="schedule-btn"
            onClick={() => navigate("/schedule-pickup")}
          >
            Schedule Another Pickup
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmed;
