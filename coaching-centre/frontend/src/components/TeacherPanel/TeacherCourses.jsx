import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import TeacherCourseCard from "./TeacherCourseCard";
import "./TeacherPanel.css";

const TeacherCourses = () => {

  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);


  // ==================== GET TEACHER COURSES ====================

  const getMyCourses = async () => {

    try {

      setLoading(true);

      const response = await api.get(
        "/courses/teacher/my-courses"
      );

      console.log(
        "Teacher Courses:",
        response.data
      );

      setCourses(
        response.data.courses || []
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to load courses"
      );

    } finally {

      setLoading(false);

    }

  };


  // ==================== LOAD COURSES ====================

  useEffect(() => {

    getMyCourses();

  }, []);


  // ==================== LOADING ====================

  if (loading) {

    return (

      <div className="teacher-my-courses">

        <div className="loading-container">

          <h2>
            Loading courses...
          </h2>

        </div>

      </div>

    );

  }


  // ==================== TOTAL STUDENTS ====================

  const totalStudents = courses.reduce(
    (total, course) =>
      total + (course.studentCount || 0),
    0
  );


  // ==================== RETURN ====================

  return (

    <div className="teacher-my-courses">


      {/* ==================== HEADER ==================== */}

      <div className="my-courses-header">

        <div>

          <h1>
            My Courses
          </h1>

          <p>
            Manage the courses you teach.
          </p>

        </div>


        <button
          className="add-course-btn"
          onClick={() =>
            navigate("/teacher/create-course")
          }
        >
          + Add New Course
        </button>

      </div>



      {/* ==================== SUMMARY ==================== */}

      <div className="course-summary">


        {/* TOTAL COURSES */}

        <div className="summary-card">

          <h3>
            Total Courses
          </h3>

          <strong>
            {courses.length}
          </strong>

        </div>


        {/* TOTAL STUDENTS */}

        <div className="summary-card">

          <h3>
            Total Students
          </h3>

          <strong>
            {totalStudents}
          </strong>

        </div>


      </div>



      {/* ==================== NO COURSES ==================== */}

      {courses.length === 0 ? (

        <div className="no-courses">

          <h2>
            No Courses Found
          </h2>

          <p>
            You haven't created any courses yet.
          </p>


          <button
            onClick={() =>
              navigate("/teacher/create-course")
            }
          >
            Create Your First Course
          </button>

        </div>

      ) : (


        /* ==================== COURSES ==================== */

        <div className="teacher-courses-grid">

          {courses.map((course) => (

            <TeacherCourseCard

              key={course._id}

              title={
                course.title
              }

              students={
                course.studentCount || 0
              }

              duration={
                course.duration || "N/A"
              }

              status={
                course.status || "Active"
              }

              description={
                course.description ||
                "No description available."
              }

              price={
                course.price || "N/A"
              }

            />

          ))}

        </div>

      )}

    </div>

  );

};

export default TeacherCourses;
