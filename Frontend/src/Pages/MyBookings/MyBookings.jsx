import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyBookings.css";
import { FaSearch, FaFilter, FaChartLine, FaCalendarAlt, FaWeight, FaTimes } from "react-icons/fa";

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showStats, setShowStats] = useState(false);
  const [dateFilter, setDateFilter] = useState({ startDate: "", endDate: "" });
  const [weightFilter, setWeightFilter] = useState({ min: "", max: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/role-select");
      return;
    }
    fetchBookings();
    fetchStats();
  }, [navigate, token]);

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bookings/stats", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchBookings();
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/search?q=${encodeURIComponent(searchQuery)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleDateFilter = async () => {
    try {
      const params = new URLSearchParams();
      if (dateFilter.startDate) params.append("startDate", dateFilter.startDate);
      if (dateFilter.endDate) params.append("endDate", dateFilter.endDate);
      if (weightFilter.min) params.append("minWeight", weightFilter.min);
      if (weightFilter.max) params.append("maxWeight", weightFilter.max);

      const response = await fetch(`http://localhost:5000/api/bookings/date-range?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error("Error filtering:", error);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setDateFilter({ startDate: "", endDate: "" });
    setWeightFilter({ min: "", max: "" });
    fetchBookings();
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

  if (loading) {
    return (
      <div className="my-bookings-container">
        <div className="loading">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="my-bookings-container">
      <div className="my-bookings-content">
        <div className="page-header">
          <h1>My Bookings</h1>
          <button className="stats-btn" onClick={() => setShowStats(!showStats)}>
            <FaChartLine /> View Stats
          </button>
        </div>

        {showStats && stats && (
          <div className="stats-panel">
            <div className="stats-header">
              <h2>Booking Statistics</h2>
              <button onClick={() => setShowStats(false)}><FaTimes /></button>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Bookings</h3>
                <p className="stat-value">{stats.overall?.totalBookings || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Total Weight</h3>
                <p className="stat-value">{stats.overall?.totalWeight?.toFixed(1) || 0} kg</p>
              </div>
              <div className="stat-card">
                <h3>Average Weight</h3>
                <p className="stat-value">{stats.overall?.avgWeight?.toFixed(1) || 0} kg</p>
              </div>
              <div className="stat-card">
                <h3>Max Weight</h3>
                <p className="stat-value">{stats.overall?.maxWeight?.toFixed(1) || 0} kg</p>
              </div>
            </div>
            <div className="stats-by-status">
              <h3>By Status</h3>
              <div className="status-bars">
                {stats.byStatus?.map((item) => (
                  <div key={item._id} className="status-bar-item">
                    <span className="status-label">{item._id}</span>
                    <div className="status-bar">
                      <div 
                        className="status-bar-fill" 
                        style={{ 
                          width: `${(item.count / stats.overall.totalBookings) * 100}%`,
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

        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by address or scrap type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}><FaSearch /></button>
          </div>

          <div className="filter-group">
            <div className="filter-item">
              <label>From Date</label>
              <input
                type="date"
                value={dateFilter.startDate}
                onChange={(e) => setDateFilter({...dateFilter, startDate: e.target.value})}
              />
            </div>
            <div className="filter-item">
              <label>To Date</label>
              <input
                type="date"
                value={dateFilter.endDate}
                onChange={(e) => setDateFilter({...dateFilter, endDate: e.target.value})}
              />
            </div>
            <div className="filter-item">
              <label>Min Weight (kg)</label>
              <input
                type="number"
                placeholder="0"
                value={weightFilter.min}
                onChange={(e) => setWeightFilter({...weightFilter, min: e.target.value})}
              />
            </div>
            <div className="filter-item">
              <label>Max Weight (kg)</label>
              <label />
              <input
                type="number"
                placeholder="100"
                value={weightFilter.max}
                onChange={(e) => setWeightFilter({...weightFilter, max: e.target.value})}
              />
            </div>
            <button className="apply-filter-btn" onClick={handleDateFilter}>
              <FaFilter /> Apply
            </button>
            <button className="clear-filter-btn" onClick={clearFilters}>
              Clear
            </button>
          </div>
        </div>

        <div className="bookings-list">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-header">
                  <span className="booking-id">#{booking._id.slice(-6)}</span>
                  <span 
                    className="booking-status"
                    style={{ backgroundColor: getStatusColor(booking.status) }}
                  >
                    {booking.status}
                  </span>
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
                  <p>{booking.address?.street}, {booking.address?.city} - {booking.address?.pincode}</p>
                </div>
                <div className="booking-materials">
                  {booking.scrapTypes?.map((type, index) => (
                    <span key={index} className="material-tag">{type}</span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="no-bookings">
              <p>No bookings found</p>
              <button onClick={() => navigate("/schedule-pickup")}>
                Schedule a Pickup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;