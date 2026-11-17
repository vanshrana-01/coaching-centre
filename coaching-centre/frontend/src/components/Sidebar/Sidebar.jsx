import React from 'react'
import {NavLink} from "react-router-dom";
import "./Sidebar.css"


const Sidebar = () => {
  return (
    <aside className="sidebar">
        <h2 className="logo">CodeShala</h2>
        <nav>
            <NavLink to="/student/dashboard">Dashboard</NavLink>
            <NavLink to="/student/courses">My Courses</NavLink>
            <NavLink to="/student/assignment">Assignment</NavLink>
            <NavLink to="/student/attendance"> Attendance </NavLink>
            <NavLink to="/student/certificates">Certificates</NavLink>
            <NavLink to="/student/profile">Profile</NavLink>
            <NavLink to="/student/settings">Settings</NavLink>
        </nav>
    </aside>

  )
}

export default Sidebar
