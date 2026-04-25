import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelect.css';
import { FaRecycle, FaTruck } from 'react-icons/fa';

const RoleSelect = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate('/auth', { state: { role } });
  };

  return (
    <div className="role-select-container">
      <div className="role-select-content">
        <h1 className="role-select-title">Choose Your Role</h1>
        <p className="role-select-subtitle">Select how you'd like to use ScrapSmart</p>
        
        <div className="role-cards">
          <div className="role-card" onClick={() => handleRoleSelect('pickup')}>
            <div className="role-icon">
              <FaTruck />
            </div>
            <h2>Schedule Pickup</h2>
            <p>I want to sell my scrap materials and schedule a pickup</p>
            <button className="role-select-btn">Select</button>
          </div>

          <div className="role-card" onClick={() => handleRoleSelect('collector')}>
            <div className="role-icon">
              <FaRecycle />
            </div>
            <h2>Scrap Collector</h2>
            <p>I'm a collector looking to buy scrap materials</p>
            <button className="role-select-btn">Select</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;

