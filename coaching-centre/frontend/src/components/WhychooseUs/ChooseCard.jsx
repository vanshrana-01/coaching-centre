import React from 'react'
import "./ChooseCard.css"

const ChooseCard = ({feature}) => {
  return (
    <div className='choose-card'>
        <div className="icon">
            {feature.icon}
        </div>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      
    </div>
  )
}

export default ChooseCard
