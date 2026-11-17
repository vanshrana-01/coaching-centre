import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Topbar from '../../components/Topbar/Topbar'
import { Outlet } from 'react-router-dom'
import "./StudentLayout.css"

const StudentLayout = () => {
  return (
    
    
      <div className='student-layout'>
      <Sidebar/>
      <div className="student-main">
        <Topbar/>
        <div className="student-content">
          <Outlet/>
        </div>
      </div>
      
    </div>
    
  )
}

export default StudentLayout
