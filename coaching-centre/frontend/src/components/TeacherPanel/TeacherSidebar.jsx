import React from "react";
import { NavLink } from "react-router-dom";
import "./TeacherPanel.css";

const TeacherSidebar = () => {
  return (
    <div className="teacher-sidebar">

      <h2 className="logo">CodeShala</h2>

      <nav>

        <NavLink to="/teacher/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/teacher/my-courses">
          My Courses
        </NavLink>

        <NavLink to="/teacher/students">
          Students
        </NavLink>

        {/* Classes */}

        <NavLink to="/teacher/create-class">
          Create Class
        </NavLink>

        <NavLink to="/teacher/my-classes">
          My Classes
        </NavLink>

        {/* Assignments */}


        <NavLink to="/teacher/create-assignment">
          Create Assignment
        </NavLink>

        <NavLink to="/teacher/my-assignments">
          Assignments
        </NavLink>

        <NavLink to="/teacher/attendance">
          Attendance
        </NavLink>

        <NavLink to="/teacher/profile">
          Profile
        </NavLink>

        <NavLink to="/teacher/settings">
          Settings
        </NavLink>

      </nav>

    </div>
  );
};

export default TeacherSidebar;