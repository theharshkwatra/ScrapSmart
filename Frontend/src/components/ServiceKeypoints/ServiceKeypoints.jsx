import React from 'react'
import './ServiceKeypoints.css'

const ServiceKeypoints = ({ icon, title, desc }) => {
  return (
    <div className="keypoints">
      <div className="icon-box">
        <div className="keypoint-icon">
          {icon}
        </div>
      </div>

      <div className="content">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  )
}

export default ServiceKeypoints
