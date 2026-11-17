import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "./PopularCourses.css";
import CoursesCard from "./CoursesCard";

const PopularCourses = () => {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= GET ALL COURSES =================

  const getCourses = async () => {
    try {

      const response = await api.get("/courses");

      console.log("Home Courses:", response.data);

      setCourses(response.data.courses || []);

    } catch (error) {

      console.log(
        error.response?.data?.message ||
        error.message
      );

    } finally {

      setLoading(false);

    }
  };

  // ================= LOAD COURSES =================

  useEffect(() => {
    getCourses();
  }, []);

  return (

    <div className="popular-courses">

      {/* ================= TITLE ================= */}

      <div className="section-title">

        <h2>
          Popular Courses
        </h2>

        <p>
          Choose from our most popular courses
          designed by industry experts.
        </p>

      </div>


      {/* ================= LOADING ================= */}

      {loading ? (

        <div className="courses-message">
          <p>Loading courses...</p>
        </div>

      ) : courses.length === 0 ? (

        /* ================= NO COURSES ================= */

        <div className="courses-message">

          <h3>
            No Courses Available
          </h3>

          <p>
            Courses will appear here once they are created.
          </p>

        </div>

      ) : (

        /* ================= COURSES ================= */

        <div className="courses-container">

          {courses.slice(0, 6).map((course) => (

            <CoursesCard
              key={course._id}
              course={course}
            />

          ))}

        </div>

      )}

    </div>

  );
};

export default PopularCourses;
