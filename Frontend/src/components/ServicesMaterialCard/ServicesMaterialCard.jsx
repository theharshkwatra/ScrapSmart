import React from 'react'
import { FaRecycle } from 'react-icons/fa'
import './ServicesMaterialCard.css'

const ServicesMaterialCard = (props) => {
  return (
    <div className="scrp-card-shell">
      <FaRecycle className="scrp-card-ico" />

      <div className="scrp-card-body">
        <h3 className="scrp-card-head">{props.title}</h3>
        <p className="scrp-card-text">{props.desc}</p>
      </div>
    </div>
  )
}

export default ServicesMaterialCard
