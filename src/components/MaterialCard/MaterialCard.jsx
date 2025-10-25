import React from 'react'
import { FaRecycle } from 'react-icons/fa'
import './MaterialCard.css'

const MaterialCard = (props) => {
  return (
    <div className='material-card'>
        <FaRecycle className='material-icon'/>
        <div className='material-box'>
        <h3 className='material'> {props.title} </h3>
        <p className='desc'> {props.desc} </p>
      </div>
    </div>
  )
}

export default MaterialCard
