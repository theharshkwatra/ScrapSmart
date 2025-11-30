import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      setIsAuthenticated(userData.isAuthenticated || false);
    };

    checkAuth();
    // Re-check on route changes
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, [location]);

  // Also check on mount and when location changes
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setIsAuthenticated(userData.isAuthenticated || false);
  }, [location.pathname]);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    // Optionally clear bookings if you want to clear all data
    // localStorage.removeItem('bookings');
    setIsAuthenticated(false);
    // Redirect to home page
    navigate("/");
  };

  const navItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "How It Works", to: "/how-it-works" },
  ];

  return (
    <div>
      <nav className="navbar">
        <Logo />
        <div className="navbar-links">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
            >
              {({ isActive }) => (
                <Button label={item.label} active={isActive} />
              )}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/role-select" className="navlink get-started-link">
              <Button
                label="Get Started"
                color="white"
                text="rgba(0, 102, 255, 1)"
              />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
