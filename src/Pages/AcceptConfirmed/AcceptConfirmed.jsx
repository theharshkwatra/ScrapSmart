import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AcceptConfirmed.css";
import { FaCheckCircle } from "react-icons/fa";

const AcceptConfirmed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingId = location.state?.bookingId;

  return (
    <div className="accept-confirmed-container">
      <div className="accept-confirmed-content">
        <div className="success-icon">
          <FaCheckCircle />
        </div>
        <h1>Pickup Assigned!</h1>
        <p className="confirmation-message">
          You have successfully accepted this pickup. The customer has been
          notified.
        </p>

        <div className="confirmation-actions">
          <button
            className="dashboard-btn"
            onClick={() => navigate("/collector-dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptConfirmed;
