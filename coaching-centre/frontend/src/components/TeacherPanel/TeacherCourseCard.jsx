import React from 'react'
import "./TeacherPanel.css"
const TeacherCourseCard = ({title,students,duration,status,description,}) => {
  return (
    <div className='teacher-course-card'>
        <div className="course-card-header">
            <span className='course-icon'>📚</span>
            <span className={`course-status $ {status.toLowerCase()}`}>{status}</span>
        </div>
        <h2>{title}</h2>
        <p className='course-description'>{description}</p>
        <div className="course-info">
            <span>👨‍🎓{students}</span>
            <span>⌛{duration}</span>
        </div>
        <div className="course-card-btn">
            <button className='view-course-btn'>View</button>
            <button className='edit-course-btn'>Edit</button>
            
        </div>
      
    </div>
  )
}

export default TeacherCourseCard
