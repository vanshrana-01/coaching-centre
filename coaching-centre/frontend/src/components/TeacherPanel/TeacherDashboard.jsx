import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./TeacherPanel.css";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  const [assignmentCount, setAssignmentCount] = useState(0);
  const [pendingReviews, setPendingReviews] = useState(0);

  useEffect(() => {
    const getTeacherData = async () => {
      try {
        // Get teacher courses
        const coursesResponse = await api.get(
          "/courses/teacher/my-courses"
        );

        setCourses(coursesResponse.data.courses || []);

        // Get student count
        const studentResponse = await api.get(
          "/courses/teacher/student-count"
        );

        setStudentCount(
          studentResponse.data.studentCount || 0
        );

        // Get assignment count
        const assignmentResponse = await api.get(
          "/assignments/teacher/count"
        );

        setAssignmentCount(
          assignmentResponse.data.assignmentCount || 0
        );

        // Get pending reviews
        const pendingResponse = await api.get(
          "/submissions/teacher/pending"
        );

        setPendingReviews(
          pendingResponse.data.pendingCount || 0
        );

      } catch (error) {
        console.log(
          error.response?.data?.message ||
          error.message
        );
      }
    };

    getTeacherData();
  }, []);

  return (
    <div className="teacher-dashboard">

      {/* ================= HEADER ================= */}

      <div className="dashboard-heading">

        <div>
          <h1>Teacher Dashboard</h1>

          <p>
            Welcome back! Here's what's happening with your
            courses.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/teacher/create-assignment")
          }
        >
          + Create Assignment
        </button>

      </div>


      {/* ================= STATS ================= */}

      <div className="teacher-stats">

        <div className="teacher-stats-card">
          <h3>Total Courses</h3>

          <h2>{courses.length}</h2>

          <p>Courses Created</p>
        </div>


        <div className="teacher-stats-card">
          <h3>Total Students</h3>

          <h2>{studentCount}</h2>

          <p>Enrolled Students</p>
        </div>


        <div className="teacher-stats-card">
          <h3>Assignments</h3>

          <h2>{assignmentCount}</h2>

          <p>Total Assignments</p>
        </div>


        <div className="teacher-stats-card">
          <h3>Pending Reviews</h3>

          <h2>{pendingReviews}</h2>

          <p>Need your attention</p>
        </div>

      </div>


      {/* ================= DASHBOARD SECTIONS ================= */}

      <div className="dashboard-sections">

        {/* ================= MY COURSES ================= */}

        <div className="teacher-card">

          <h2>My Courses</h2>

          {courses.length === 0 ? (

            <p>No courses created yet.</p>

          ) : (

            courses.map((course) => (

              <div
                className="course-row"
                key={course._id}
              >

                <div>
                  <h3>{course.title}</h3>

                  <p>
                    {course.studentCount || 0} Students
                  </p>
                </div>

                <div>
                  <span>Active</span>
                </div>

              </div>

            ))

          )}

        </div>


        {/* ================= RECENT ACTIVITY ================= */}

        <div className="teacher-card">

          <h2>Recent Activity</h2>

          <div className="activity">

            <strong>
              Courses
            </strong>

            <p>
              {courses.length} courses created
            </p>

          </div>


          <div className="activity">

            <strong>
              Assignments
            </strong>

            <p>
              {assignmentCount} assignments created
            </p>

          </div>


          <div className="activity">

            <strong>
              Pending Reviews
            </strong>

            <p>
              {pendingReviews} submissions waiting for review
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default TeacherDashboard;