import { FaBalanceScale, FaTruck, FaCube, FaShieldAlt } from 'react-icons/fa';
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsGraphUp } from "react-icons/bs";


const servicesData = [
  {
    icon: <FaBalanceScale size={36} />,
    title: "Scrap Valuation",
    content: "AI-powered instant quotes based on real-time market rates. Get the best price for your materials.",
    points: ["Real-time pricing", "Market analytics", "Price predictions"]
  },
  {
    icon: <FaTruck size={36} />,
    title: "Pickup & Logistics",
    content: "Convenient scheduling with our fleet. We come to you, anywhere, anytime.",
    points: ["Same-day pickup", "GPS tracking", "Flexible scheduling"]
  },
  {
    icon: <FaCube size={36} />,
    title: "Material Processing",
    content: "State-of-the-art facilities for sorting, processing, and preparing materials for recycling.",
    points: ["Advanced sorting", "Quality control", "Eco-friendly processing"]
  },
  {
    icon: <IoDocumentTextOutline size={36} />,
    title: "Documentation",
    content: "Complete digital records for compliance, auditing, and environmental reporting.",
    points: ["Digital certificates", "Compliance reports", "Transaction History"]
  },
  {
    icon: <BsGraphUp size={36} />,
    title: "Market Insights",
    content: "Access to market trends, price forecasts, and industry analysis to maximize your returns.",
    points: ["Price alerts", "Market trends", "Analytics dashboard"]
  },
  {
    icon: <FaShieldAlt size={36} />,
    title: "Secure Payments",
    content: "Fast, secure transactions with multiple payment options and instant settlements.",
    points: ["Multiple payment methods", "Instant transfers", "Payment protection"]
  }
];

export default servicesData;