import React from 'react'
import './FeatureCard.css'

const FeatureCard = (props) => {
  return (
    <div className="featureCard">
      <div className="icon">{props.icon}</div>
      <div className="num">{props.num}</div>
      <div className="desc">{props.desc}</div>
    </div>
  )
}

export default FeatureCard
