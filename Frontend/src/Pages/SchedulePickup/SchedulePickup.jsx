import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SchedulePickup.css";
import { FaFileAlt, FaRecycle, FaBolt, FaMicrochip } from "react-icons/fa";

const materials = [
  {
    id: "paper",
    name: "Paper & Cardboard",
    icon: <FaFileAlt />,
    pricePerKg: 12,
    color: "#3b82f6",
  },
  {
    id: "plastic",
    name: "Plastic",
    icon: <FaRecycle />,
    pricePerKg: 18,
    color: "#22c55e",
  },
  {
    id: "metal",
    name: "Metal",
    icon: <FaBolt />,
    pricePerKg: 35,
    color: "#f59e0b",
  },
  {
    id: "ewaste",
    name: "E-waste",
    icon: <FaMicrochip />,
    pricePerKg: 25,
    color: "#a855f7",
  },
];

const SchedulePickup = () => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({
    paper: 0,
    plastic: 0,
    metal: 0,
    ewaste: 0,
  });

  const handleQuantityChange = (materialId, value) => {
    const numValue = Math.max(0, parseFloat(value) || 0);
    setQuantities({
      ...quantities,
      [materialId]: numValue,
    });
  };

  const calculateTotal = () => {
    return materials.reduce((total, material) => {
      return total + quantities[material.id] * material.pricePerKg;
    }, 0);
  };

  const hasAnyQuantity = () => {
    return Object.values(quantities).some((qty) => qty > 0);
  };

  const handleNext = () => {
    if (!hasAnyQuantity()) {
      alert("Please select at least one material with quantity");
      return;
    }

    const selectedMaterials = {};
    materials.forEach((material) => {
      if (quantities[material.id] > 0) {
        selectedMaterials[material.id] = {
          name: material.name,
          quantity: quantities[material.id],
          pricePerKg: material.pricePerKg,
        };
      }
    });

    navigate("/order-summary", {
      state: {
        materials: selectedMaterials,
        quantities: quantities,
        estimatedValue: calculateTotal(),
      },
    });
  };

  return (
    <div className="schedule-pickup-container">
      <div className="schedule-pickup-content">
        <div className="schedule-header">
          <h1>Select Material Type</h1>
        </div>

        <div className="materials-grid">
          {materials.map((material) => (
            <div key={material.id} className="material-card">
              <div
                className="material-icon"
                style={{
                  backgroundColor: `${material.color}20`,
                  color: material.color,
                }}
              >
                {material.icon}
              </div>
              <h3>{material.name}</h3>
              <p className="material-price">₹{material.pricePerKg}/kg</p>
              <div className="quantity-input-group">
                <input
                  type="number"
                  id={material.id}
                  min="0"
                  step="0.1"
                  value={quantities[material.id] || ""}
                  onChange={(e) =>
                    handleQuantityChange(material.id, e.target.value)
                  }
                  placeholder="Enter quantity (kg)"
                />
              </div>
              {quantities[material.id] > 0 && (
                <p className="material-total">
                  ₹{(quantities[material.id] * material.pricePerKg).toFixed(0)}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="schedule-footer">
          <button
            className="continue-btn"
            onClick={handleNext}
            disabled={!hasAnyQuantity()}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchedulePickup;
