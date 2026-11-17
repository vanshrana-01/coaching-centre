import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./CountinueLearning.css";

const ContinueLearning = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= GET MY COURSES =================

  const getMyCourses = async () => {
    try {
      const response = await api.get(
        "/enrollments/my-courses"
      );

      console.log("My Courses:", response.data);

      setCourses(response.data.courses || []);

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

  useEffect(() => {
    getMyCourses();
  }, []);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="continue-learning">
        <div className="section-header">
          <h2>Continue Learning</h2>
        </div>

        <p>Loading courses...</p>
      </div>
    );
  }

  // ================= NO COURSES =================

  if (courses.length === 0) {
    return (
      <div className="continue-learning">

        <div className="section-header">
          <h2>Continue Learning</h2>
        </div>

        <div className="no-courses">
          <h3>No Courses Yet</h3>
          <p>
            Enroll in a course to start learning.
          </p>
        </div>

      </div>
    );
  }

  return (
    <div className="continue-learning">

      {/* ================= HEADER ================= */}

      <div className="section-header">

        <h2>Continue Learning</h2>

        <button>
          View All
        </button>

      </div>


      {/* ================= COURSES ================= */}

      <div className="enrolled-courses">

        {courses.map((enrollment) => {

          const course = enrollment.course;

          if (!course) return null;

          return (

            <div
              className="course-card"
              key={enrollment._id}
            >

              {/* COURSE IMAGE */}

              <img
                src={
                  course.image ||
                  "https://placehold.co/300x180"
                }
                alt={course.title}
              />


              {/* COURSE INFO */}

              <div className="course-info">

                <h3>
                  {course.title}
                </h3>

                <p>
                  {course.description}
                </p>


                {/* PROGRESS */}

                <p>
                  Progress: 0%
                </p>

                <div className="progress-bar">

                  <div
                    className="progress"
                    style={{
                      width: "0%",
                    }}
                  ></div>

                </div>


                {/* BUTTON */}

                <button
                  onClick={() => navigate(`/student/courses/${course._id}`)}
                >
                  Resume Course
                </button>

              </div>

            </div>

          );
        })}

      </div>

    </div>
  );
};

export default ContinueLearning;