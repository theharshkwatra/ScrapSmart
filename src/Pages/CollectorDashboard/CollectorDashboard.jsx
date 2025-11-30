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
  const [activeTab, setActiveTab] = useState("active");
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    todayPickups: 0,
    completed: 0,
  });

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (!userData.isAuthenticated || userData.role !== "collector") {
      navigate("/role-select");
      return;
    }
    setUser(userData);

    // Load bookings
    loadBookings();
  }, [navigate]);

  const loadBookings = () => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(allBookings);

    // Calculate stats
    const today = new Date().toISOString().split("T")[0];
    const todayBookings = allBookings.filter((b) => b.date === today);
    const completedBookings = allBookings.filter(
      (b) =>
        b.status === "completed" &&
        b.collectorId === (user?.email || user?.name || "collector")
    );

    setStats({
      todayPickups: todayBookings.filter(
        (b) =>
          (b.status === "assigned" || b.status === "completed") &&
          b.collectorId === (user?.email || user?.name || "collector")
      ).length,
      completed: completedBookings.length,
    });
  };

  const handleAccept = (bookingId) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updatedBookings = allBookings.map((booking) => {
      if (booking.id === bookingId) {
        return {
          ...booking,
          status: "assigned",
          collectorId: user?.email || user?.name || "collector",
          collectorName: user?.name || "Collector",
        };
      }
      return booking;
    });
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    loadBookings();
    navigate("/accept-confirmed", { state: { bookingId } });
  };

  const getMaterialName = (materials) => {
    const materialNames = {
      paper: "Paper & Cardboard",
      plastic: "Plastic Bottles",
      metal: "Metal Scrap",
      ewaste: "E-Waste",
    };
    const entries = Object.entries(materials || {});
    if (entries.length > 0) {
      return `${materialNames[entries[0][0]] || "Mixed"} - ${entries[0][1]} kg`;
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
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleComplete = (bookingId) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updatedBookings = allBookings.map((booking) => {
      if (booking.id === bookingId) {
        return {
          ...booking,
          status: "completed",
        };
      }
      return booking;
    });
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    loadBookings();
  };

  const assignedBookings = bookings.filter(
    (b) =>
      (b.status === "assigned" || b.status === "completed") &&
      b.collectorId === (user?.email || user?.name || "collector")
  );
  const pendingBookings = bookings.filter(
    (b) => b.status === "pending" || b.status === "confirmed"
  );

  const displayBookings =
    activeTab === "active" ? assignedBookings : pendingBookings;

  return (
    <div className="collector-dashboard-container">
      <div className="collector-dashboard-content">
        {/* Header */}
        <div className="collector-header">
          <div className="header-left">
            <h1>
              Hello, <span className="wave">👋</span>
            </h1>
            <p>Ready to collect today?</p>
          </div>
        </div>

        {/* Stats Cards */}
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

        {/* Tabs */}
        <div className="tabs-container">
          <button
            className={`tab ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </button>
          <button
            className={`tab ${activeTab === "active" ? "active" : ""}`}
            onClick={() => setActiveTab("active")}
          >
            Active Pickups
          </button>
        </div>

        {/* Bookings List */}
        <div className="bookings-section">
          {displayBookings.length > 0 ? (
            displayBookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-header">
                  <div>
                    <h3>{booking.customerName || "Customer"}</h3>
                    <p className="order-id">
                      Order #{booking.id.slice(-6).toUpperCase()}
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
                    <span>{booking.address || "Address not provided"}</span>
                  </div>
                  <div className="detail-row">
                    <FaBox />
                    <span>{getMaterialName(booking.materials)}</span>
                  </div>
                  <div className="detail-row">
                    <FaClock />
                    <span>
                      {formatDate(booking.date)} • {formatTime(booking.time)}
                    </span>
                  </div>
                </div>

                <div className="booking-footer">
                  <div className="booking-value">
                    ₹{booking.estimatedValue?.toFixed(0) || "0"}
                  </div>
                  {activeTab === "pending" && (
                    <button
                      className="accept-btn"
                      onClick={() => handleAccept(booking.id)}
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
                        handleComplete(booking.id)
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
