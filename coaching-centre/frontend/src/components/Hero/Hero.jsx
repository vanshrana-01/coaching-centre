import React from 'react'
import "./Hero.css"



const Hero = () => {
  return (
    <div className='hero-container'>
        <div className="left-side">
            <h1>Become a Job-Ready Developer</h1>
            <p>
                Learn Full Stack Development from industry experts.
                Buil real-world projects and get placement support.
            </p>
            <div className="hero-btn">
                <button className='btn-1'>Explore Courses</button>
                    <button className='btn-2'>Book Free Demo</button>
            </div>
            <div className="hero-stats">
                <div className="card">
                    <h3>50+</h3>
                    <p>Courses</p>
                </div>
                <div className="card">
                    <h3>5000+</h3>
                    <p>Stduents</p>
                </div>
                <div className="card">
                    <h3>95%</h3>
                    <p>Placement Supports</p>
                </div>
            </div>
        </div>
        <div className="right-side">
            <img src="images.jpg" alt="Hero" />
        </div>
        
      
    </div>
  )
}

export default Hero
