import React from 'react'
import './ServiceTile.css'

const ServiceTile = (props) => {
    return (
        <div className='service-tile'>
            <div className='icon-box'>
                <div className='tile-icon'> {props.icon} </div>
            </div>
            <h3 className='title'> {props.title} </h3>
            <p className='content'> {props.content} </p>

            <ul className='service-list'>
                <li> {props.item1} </li>
                <li> {props.item2} </li>
                <li> {props.item3} </li>
            </ul>
        </div>
    )
}

export default ServiceTile
