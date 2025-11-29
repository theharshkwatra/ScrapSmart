import React from 'react'
import './ServiceTile.css'

const ServiceTile = (props) => {
    return (
        <div className='service-tile'>
            <div className='icon-box'>
                <div className='tile-icon'> {props.icon} </div>
            </div>
            <h3 className='title'> {props.title} </h3>
            <p className='content'> {props.description} </p>

            <ul className='service-list'>
                {props.points.map((point, index) => (
                    <li key={index}>{point}</li>
                ))}
            </ul>
        </div>
    )
}

export default ServiceTile
