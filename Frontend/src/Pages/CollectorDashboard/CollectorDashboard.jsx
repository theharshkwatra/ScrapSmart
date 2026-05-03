import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CollectorDashboard.css";
import {
  FaBox,
  FaClock,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

const CollectorDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [availableBookings, setAvailableBookings] = useState([]);
  const [assignedBookings, setAssignedBookings] = useState([]);
  const [stats, setStats] = useState({
    todayPickups: 0,
    completed: 0,
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (!userData.isAuthenticated || userData.role !== "collector") {
      navigate("/role-select");
      return;
    }
    setUser(userData);

    loadBookings();
  }, [navigate]);

  const loadBookings = () => {
    const token = JSON.parse(localStorage.getItem("user") || "{}").token;

    fetch("http://localhost:5000/api/bookings/available", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setAvailableBookings(sortBookingsByDateTime(data.bookings));
      }
    })
    .catch(error => console.error("Error fetching available bookings:", error));

    // Load assigned
    fetch("http://localhost:5000/api/bookings/my-assigned", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setAssignedBookings(data.bookings);
      }
    })
    .catch(error => console.error("Error fetching assigned bookings:", error));
  };

  const handleAccept = (bookingId) => {
    const token = JSON.parse(localStorage.getItem("user") || "{}").token;
    fetch(`http://localhost:5000/api/bookings/${bookingId}/accept`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        loadBookings();
        navigate("/accept-confirmed", { state: { bookingId } });
      } else {
        alert(data.message || 'Failed to accept booking');
      }
    })
    .catch(error => {
      console.error("Error accepting booking:", error);
      alert('Unable to connect to server. Please try again.');
    });
  };

  const getMaterialName = (scrapTypes) => {
    const materialNames = {
      paper: "Paper & Cardboard",
      plastic: "Plastic Bottles",
      metal: "Metal Scrap",
      ewaste: "E-Waste",
    };
    if (scrapTypes && scrapTypes.length > 0) {
      return `${materialNames[scrapTypes[0]] || "Mixed"}`;
    }
    return "Mixed Materials";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    // Assuming timeSlot is like '9am-12pm'
    return timeString;
  };

  const sortBookingsByDateTime = (bookings) => {
    const timeOrder = ['9am-12pm', '12pm-3pm', '3pm-6pm'];
    return [...bookings].sort((a, b) => {
      const dateA = new Date(a.scheduledDate);
      const dateB = new Date(b.scheduledDate);
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      const timeA = timeOrder.indexOf(a.timeSlot) === -1 ? Infinity : timeOrder.indexOf(a.timeSlot);
      const timeB = timeOrder.indexOf(b.timeSlot) === -1 ? Infinity : timeOrder.indexOf(b.timeSlot);
      if (timeA < timeB) return -1;
      if (timeA > timeB) return 1;
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  };

  const handleComplete = (bookingId) => {
    const token = JSON.parse(localStorage.getItem("user") || "{}").token;
    fetch(`http://localhost:5000/api/bookings/${bookingId}/complete`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        loadBookings();
      } else {
        alert(data.message || 'Failed to complete booking');
      }
    })
    .catch(error => {
      console.error("Error completing booking:", error);
      alert('Unable to connect to server. Please try again.');
    });
  };

  const displayBookings =
    activeTab === "active" ? assignedBookings : availableBookings;

  return (
    <div className="collector-dashboard-container">
      <div className="collector-dashboard-content">
        <div className="collector-header">
          <div className="header-left">
            <h1>
              Hello, <span className="wave">👋</span>
            </h1>
            <p>Ready to collect today?</p>
          </div>
        </div>

        <div className="stats-cards">
          <div className="stat-card-collector">
            <div className="stat-icon-collector pickup">
              <FaBox />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.todayPickups}</div>
              <div className="stat-label">Today's Pickups</div>
            </div>
          </div>

          <div className="stat-card-collector">
            <div className="stat-icon-collector completed">
              <FaClock />
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.completed}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
        </div>

        <div className="tabs-container">
          <button
            className={`tab ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Pickups
          </button>
          <button
            className={`tab ${activeTab === "active" ? "active" : ""}`}
            onClick={() => setActiveTab("active")}
          >
            Active Pickups
          </button>
        </div>

        <div className="bookings-section">
          {displayBookings.length > 0 ? (
            displayBookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-header">
                  <div>
                    <h3>Pickup Request</h3>
                    <p className="order-id">
                      Order ID #{booking._id?.toString().slice(-12).toUpperCase() || "N/A"}
                    </p>
                  </div>
                  <span className={`status-badge ${booking.status}`}>
                    {booking.status === "assigned"
                      ? "Assigned"
                      : booking.status === "completed"
                      ? "Completed"
                      : "Pending"}
                  </span>
                </div>

                <div className="booking-details">
                  <div className="detail-row">
                    <FaMapMarkerAlt />
                    <span>{booking.address?.street || "Address not provided"}</span>
                  </div>
                  <div className="detail-row">
                    <FaBox />
                    <span>{getMaterialName(booking.scrapTypes)}</span>
                  </div>
                  <div className="detail-row">
                    <FaClock />
                    <span>
                      {formatDate(booking.scheduledDate)} • {formatTime(booking.timeSlot)}
                    </span>
                  </div>
                </div>

                <div className="booking-footer">
                  <div className="booking-value">
                    ₹{(booking.estimatedWeight * 10)?.toFixed(0) || "0"}
                  </div>
                  {activeTab === "pending" && (
                    <button
                      className="accept-btn"
                      onClick={() => handleAccept(booking._id)}
                    >
                      Accept
                    </button>
                  )}
                  {activeTab === "active" && (
                    <button
                      className={`complete-btn ${
                        booking.status === "completed" ? "completed" : ""
                      }`}
                      onClick={() =>
                        booking.status !== "completed" &&
                        handleComplete(booking._id)
                      }
                      disabled={booking.status === "completed"}
                    >
                      {booking.status === "completed" ? (
                        <>
                          <FaCheckCircle />
                          <span>Completed</span>
                        </>
                      ) : (
                        <>
                          <FaArrowRight />
                          <span>Complete</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-bookings">
              <p>No {activeTab} bookings available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectorDashboard;
