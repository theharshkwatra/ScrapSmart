import React from 'react'
import './FeatureCard.css'

const FeatureCard = (props) => {
  return (
    <div className="featureCard">
      <div className="content">
        <div className="icon" style={{ color: color }}>
          {icon}
        </div>
        <h2 className="num">{num}</h2>
        <p className="desc">{desc}</p>
      </div> 
    </div>
  )
}

export default FeatureCard
