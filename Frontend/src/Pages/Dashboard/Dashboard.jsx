import { API_BASE_URL } from "../../config";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { FaCalendarAlt, FaRupeeSign, FaGlobe, FaSearch, FaChartLine, FaWeight, FaTimes, FaPlus } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({
    totalEarnings: 0,
    totalRecycled: 0,
  });

  // Bookings states
  const [bookings, setBookings] = useState([]);
  const [bookingStats, setBookingStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const [showStats, setShowStats] = useState(false);
  const [dateFilter, setDateFilter] = useState({ startDate: "", endDate: "" });
  const [newScrapTypes, setNewScrapTypes] = useState({});

  const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;

  const fetchBookings = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings);

        // Update dashboard earnings and recycled stats based on active bookings
        const activeBookings = data.bookings.filter((b) => b.status !== "cancelled");
        const earnings = activeBookings.reduce(
          (sum, booking) => sum + ((booking.estimatedWeight || 0) * 10),
          0
        );
        const recycled = activeBookings.reduce((sum, booking) => {
          return sum + (booking.estimatedWeight || 0);
        }, 0);

        setDashboardStats({
          totalEarnings: earnings,
          totalRecycled: recycled
        });
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchStats = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setBookingStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }, [token]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (!userData.isAuthenticated) {
      navigate("/role-select");
      return;
    }
    if (userData.role === "collector") {
      navigate("/collector-dashboard");
      return;
    }
    setUser(userData);

    fetchBookings();
    fetchStats();
  }, [navigate, fetchBookings, fetchStats]);

  const fetchFilteredBookings = async () => {
    try {
      const params = new URLSearchParams();
      if (dateFilter.startDate) params.append("startDate", dateFilter.startDate);
      if (dateFilter.endDate) params.append("endDate", dateFilter.endDate);

      const response = await fetch(`${API_BASE_URL}/api/bookings/date-range?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        let fetchedBookings = data.bookings;
        if (searchId.trim()) {
          fetchedBookings = fetchedBookings.filter(b => b._id.toLowerCase().includes(searchId.trim().toLowerCase()));
        }
        setBookings(fetchedBookings);
      }
    } catch (error) {
      console.error("Error filtering:", error);
    }
  };

  const clearFilters = () => {
    setSearchId("");
    setDateFilter({ startDate: "", endDate: "" });
    fetchBookings();
  };

  const handleDeleteBooking = async (id) => {
    if(!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        fetchFilteredBookings();
        fetchStats();
      } else {
        alert(data.message || "Failed to delete booking.");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("An error occurred while deleting the booking.");
    }
  };

  const handleAddScrapType = async (id, scrapType) => {
    if (!scrapType || !scrapType.trim()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${id}/scrap/add`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ scrapType: scrapType.trim() })
      });
      const data = await response.json();
      if (data.success) {
        fetchFilteredBookings();
      } else {
        alert(data.message || "Failed to add scrap type.");
      }
    } catch (error) {
      console.error("Error adding scrap type:", error);
      alert("An error occurred while adding the scrap type.");
    }
  };

  const handleRemoveScrapType = async (id, scrapType) => {
    if(!window.confirm(`Remove ${scrapType} from this booking?`)) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${id}/scrap/remove`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ scrapType })
      });
      const data = await response.json();
      if (data.success) {
        fetchFilteredBookings();
      } else {
        alert(data.message || "Failed to remove scrap type.");
      }
    } catch (error) {
      console.error("Error removing scrap type:", error);
      alert("An error occurred while removing the scrap type.");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "#f59e0b",
      accepted: "#3b82f6",
      completed: "#22c55e",
      cancelled: "#ef4444"
    };
    return colors[status] || "#6b7280";
  };

  const handleSchedulePickup = () => {
    navigate("/schedule-pickup");
  };

  const co2Saved = Math.round(dashboardStats.totalRecycled * 0.66);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="welcome-banner">
          <h1>
            Welcome, <span className="wave">👋</span>
          </h1>
          <p>Ready to make a difference today?</p>
        </div>

        <div className="action-cards">
          <div className="action-card" onClick={handleSchedulePickup}>
            <div className="action-icon schedule">
              <FaCalendarAlt />
            </div>
            <h3>Schedule Pickup</h3>
            <p>Sell your scrap materials</p>
          </div>

          <div className="action-card">
            <div className="action-icon earnings">
              <FaRupeeSign />
            </div>
            <h3>My Earnings</h3>
            <p>₹{dashboardStats.totalEarnings.toFixed(0)} total</p>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-section bookings-section" style={{ gridColumn: "1 / -1" }}>
            <div className="section-header">
              <h2>My Bookings</h2>
              <button className="stats-btn" onClick={() => setShowStats(!showStats)}>
                <FaChartLine /> {showStats ? "Hide Stats" : "View Stats"}
              </button>
            </div>

            {showStats && bookingStats && (
              <div className="stats-panel">
                <div className="stats-header">
                  <h2>Booking Statistics</h2>
                  <button onClick={() => setShowStats(false)}><FaTimes /></button>
                </div>
                <div className="stats-grid">
                  <div className="stat-card">
                    <h3>Total Bookings</h3>
                    <p className="stat-value">{bookingStats.overall?.totalBookings || 0}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Total Weight</h3>
                    <p className="stat-value">{bookingStats.overall?.totalWeight?.toFixed(1) || 0} kg</p>
                  </div>
                  <div className="stat-card">
                    <h3>Average Weight</h3>
                    <p className="stat-value">{bookingStats.overall?.avgWeight?.toFixed(1) || 0} kg</p>
                  </div>
                  <div className="stat-card">
                    <h3>Max Weight</h3>
                    <p className="stat-value">{bookingStats.overall?.maxWeight?.toFixed(1) || 0} kg</p>
                  </div>
                </div>
                <div className="stats-by-status">
                  <h3>By Status</h3>
                  <div className="status-bars">
                    {bookingStats.byStatus?.map((item) => (
                      <div key={item._id} className="status-bar-item">
                        <span className="status-label">{item._id}</span>
                        <div className="status-bar">
                          <div 
                            className="status-bar-fill" 
                            style={{ 
                              width: `${(item.count / bookingStats.overall.totalBookings) * 100}%`,
                              backgroundColor: getStatusColor(item._id)
                            }}
                          ></div>
                        </div>
                        <span className="status-count">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="modern-filters-section">
              <div className="modern-filter-group">
                <div className="modern-filter-item search-input">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by ID..."
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && fetchFilteredBookings()}
                  />
                </div>
                <div className="modern-filter-item">
                  <input
                    type="date"
                    value={dateFilter.startDate}
                    onChange={(e) => setDateFilter({...dateFilter, startDate: e.target.value})}
                  />
                </div>
                <span className="filter-separator">to</span>
                <div className="modern-filter-item">
                  <input
                    type="date"
                    value={dateFilter.endDate}
                    onChange={(e) => setDateFilter({...dateFilter, endDate: e.target.value})}
                  />
                </div>
                <button className="apply-search-btn" onClick={fetchFilteredBookings}>
                  Search
                </button>
                {(searchId || dateFilter.startDate || dateFilter.endDate) && (
                  <button className="clear-filter-btn" onClick={clearFilters}>
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="bookings-list">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <div key={booking._id} className="modern-booking-card">
                    <div className="booking-header">
                      <span className="booking-id">#{booking._id.slice(-6)}</span>
                      <div className="booking-header-actions">
                        <span 
                          className="booking-status"
                          style={{ backgroundColor: getStatusColor(booking.status) }}
                        >
                          {booking.status}
                        </span>
                        {(booking.status !== "cancelled" && booking.status !== "completed") && (
                          <button className="cancel-btn" onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
                        )}
                      </div>
                    </div>
                    <div className="booking-details">
                      <div className="booking-info">
                        <FaCalendarAlt />
                        <span>{new Date(booking.scheduledDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                        <span className="time-slot">{booking.timeSlot}</span>
                      </div>
                      <div className="booking-info">
                        <FaWeight />
                        <span>{booking.estimatedWeight || 0} kg</span>
                      </div>
                    </div>
                    <div className="booking-address">
                      <p>{typeof booking.address === 'object' ? booking.address.street : booking.address}</p>
                    </div>
                    <div className="booking-materials-wrapper">
                      <div className="booking-materials">
                        {booking.scrapTypes?.map((type, index) => (
                          <span key={index} className="material-tag">
                            {type}
                            {(booking.status !== "cancelled" && booking.status !== "completed") && (
                              <button className="remove-scrap-btn" onClick={() => handleRemoveScrapType(booking._id, type)}><FaTimes /></button>
                            )}
                          </span>
                        ))}
                      </div>
                      {(() => {
                        if (booking.status === "cancelled" || booking.status === "completed") return null;
                        const availableTypes = ["paper", "plastic", "metal", "ewaste"].filter(t => !booking.scrapTypes?.includes(t));
                        if (availableTypes.length === 0) return null;
                        return (
                          <div className="add-scrap-container">
                            <select 
                              className="scrap-select pill"
                              value=""
                              onChange={(e) => handleAddScrapType(booking._id, e.target.value)}
                            >
                              <option value="" disabled>+ Add material</option>
                              {availableTypes.map(t => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-bookings" style={{ gridColumn: '1 / -1' }}>
                  <p>No bookings found</p>
                  <button onClick={() => navigate("/schedule-pickup")}>
                    Schedule a Pickup
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="dashboard-section impact-section" style={{ gridColumn: "1 / -1" }}>
            <h2>Environmental Impact</h2>
            <div className="impact-card">
              <div className="impact-header">
                <FaGlobe />
                <span>Your Contribution</span>
              </div>
              <div className="impact-stats">
                <div className="impact-stat">
                  <div className="impact-value waste">
                    {dashboardStats.totalRecycled.toFixed(1)} kg
                  </div>
                  <div className="impact-label">Waste Recycled</div>
                </div>
                <div className="impact-stat">
                  <div className="impact-value co2">
                    {co2Saved.toFixed(1)} kg
                  </div>
                  <div className="impact-label">CO₂ Saved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
