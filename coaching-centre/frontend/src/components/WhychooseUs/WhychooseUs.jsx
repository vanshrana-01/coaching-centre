import React from 'react'
import { whychooseData } from '../../data/whychooseData'
import "./WhychooseUs.css"
import ChooseCard from './ChooseCard'

const WhychooseUs = () => {
  return (
    <div className='whychoose'>
        <div className="section-title">
            <h2>Why Choose Us ?</h2>
            <p>Everything you need to become a successful software developer</p>
        </div>
        <div className="feature-container">
            {whychooseData.map((feature)=>
            (<ChooseCard key={feature.id}  feature={feature} />

            ))}
        </div>
      
    </div>
  )
}

export default WhychooseUs
