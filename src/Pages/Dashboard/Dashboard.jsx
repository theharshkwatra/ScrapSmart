import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { FaCalendarAlt, FaRupeeSign, FaGlobe } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalRecycled: 0,
    recentTransactions: [],
  });

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (!userData.isAuthenticated) {
      navigate("/role-select");
      return;
    }
    // Redirect collectors to their dashboard
    if (userData.role === "collector") {
      navigate("/collector-dashboard");
      return;
    }
    setUser(userData);

    // Get booking data from localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const confirmedBookings = bookings.filter((b) => b.status === "confirmed");

    // Calculate stats
    const earnings = confirmedBookings.reduce(
      (sum, booking) => sum + (booking.estimatedValue || 0),
      0
    );
    const recycled = confirmedBookings.reduce((sum, booking) => {
      return (
        sum +
        Object.values(booking.materials || {}).reduce(
          (matSum, qty) => matSum + qty,
          0
        )
      );
    }, 0);

    // Get recent transactions with material names
    const recentTransactions = confirmedBookings
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
      .map((booking) => {
        const materialNames = {
          paper: "Paper & Cardboard",
          plastic: "Plastic Bottles",
          metal: "Metal Scrap",
          ewaste: "E-Waste",
        };
        const materialEntries = Object.entries(booking.materials || {});
        const primaryMaterial =
          materialEntries.length > 0
            ? materialNames[materialEntries[0][0]] || "Mixed Materials"
            : "Mixed Materials";
        return {
          ...booking,
          materialName: primaryMaterial,
        };
      });

    setStats({
      totalEarnings: earnings,
      totalRecycled: recycled,
      recentTransactions,
    });
  }, [navigate]);

  const handleSchedulePickup = () => {
    navigate("/schedule-pickup");
  };

  const co2Saved = Math.round(stats.totalRecycled * 0.66);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <h1>
            Welcome, <span className="wave">👋</span>
          </h1>
          <p>Ready to make a difference today?</p>
        </div>

        {/* Action Cards */}
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
            <p>₹{stats.totalEarnings.toFixed(0)} total</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-grid">
          {/* Recent Transactions */}
          <div className="dashboard-section transactions-section">
            <div className="section-header">
              <h2>Recent Transactions</h2>
            </div>
            {stats.recentTransactions.length > 0 ? (
              <div className="transactions-list">
                {stats.recentTransactions.map((transaction, index) => (
                  <div key={index} className="transaction-item">
                    <div className="transaction-info">
                      <h4>{transaction.materialName}</h4>
                      <p>
                        {new Date(transaction.date).toLocaleDateString(
                          "en-GB",
                          { day: "numeric", month: "short", year: "numeric" }
                        )}
                      </p>
                    </div>
                    <div className="transaction-right">
                      <div className="transaction-amount">
                        ₹{transaction.estimatedValue?.toFixed(0) || "0"}
                      </div>
                      <span className="status-badge completed">Completed</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-transactions">
                <p>No transactions yet. Schedule your first pickup!</p>
              </div>
            )}
          </div>

          {/* Environmental Impact */}
          <div className="dashboard-section impact-section">
            <h2>Environmental Impact</h2>
            <div className="impact-card">
              <div className="impact-header">
                <FaGlobe />
                <span>Your Contribution</span>
              </div>
              <div className="impact-stats">
                <div className="impact-stat">
                  <div className="impact-value waste">
                    {stats.totalRecycled.toFixed(1)} kg
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
