import React from 'react'
import './ServiceCard.css'

const ServiceCard = (props) => {
  return (
    <div className='service-card'>
      <div className='icon-container'>
        <div className='service-icon'> {props.serviceIcon} </div>
      </div>
      <h3 className='service-title'> {props.serviceTitle} </h3>
      <p className='service-desc'> {props.serviceContent} </p>
    </div>
  )
}

export default ServiceCard
