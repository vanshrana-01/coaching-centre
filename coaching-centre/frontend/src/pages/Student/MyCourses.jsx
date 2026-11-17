
import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import MyCourseCard from "../../components/MyCourseCard/MyCourseCard";
import "./StudentPanel.css";

const MyCourses = () => {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= GET MY COURSES =================

  const getMyCourses = async () => {

    try {

      const response = await api.get(
        "/enrollments/my-courses"
      );

      console.log(
        "My Courses:",
        response.data
      );

      setCourses(
        response.data.courses || []
      );

    } catch (error) {

      console.log(
        error.response?.data?.message ||
        error.message
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
      <div className="my-courses-page">
        <h2>Loading your courses...</h2>
      </div>
    );

  }


  return (

    <div className="my-courses-page">

      {/* ================= HEADER ================= */}

      <div className="my-courses-header">

        <div>

          <h1>
            My Courses
          </h1>

          <p>
            Courses you are currently enrolled in.
          </p>

        </div>

      </div>


      {/* ================= NO COURSES ================= */}

      {courses.length === 0 ? (

        <div className="no-enrolled-courses">

          <h2>
            No Courses Yet
          </h2>

          <p>
            You haven't enrolled in any course yet.
          </p>

        </div>

      ) : (

        /* ================= COURSES ================= */

        <div className="my-courses-grid">

          {courses.map((enrollment) => (

            <MyCourseCard
              key={enrollment._id}
              course={enrollment.course}
            />

          ))}

        </div>

      )}

    </div>

  );

};

export default MyCourses;
