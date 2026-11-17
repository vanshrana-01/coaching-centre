import React from 'react'
import TeacherSidebar from '../../components/TeacherPanel/TeacherSidebar'
import TeacherTopbar from '../../components/TeacherPanel/TeacherTopbar'
import { Outlet } from 'react-router-dom'
import "./TeacherLayout.css"

const TeacherLayout = () => {
  return (
    <div className='teacher-layout'>
        <TeacherSidebar/>
        <div className="teacher-main">
            <TeacherTopbar/>
            <div className="teacher-content">
                <Outlet/>
            </div>
        </div>
      
    </div>
  )
}

export default TeacherLayout
