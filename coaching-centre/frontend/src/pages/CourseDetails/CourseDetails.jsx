
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import "./CourseDetails.css";

const CourseDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);


  // ================= GET COURSE =================

  const getCourse = async () => {

    try {

      const response = await api.get(
        `/courses/${id}`
      );

      console.log(
        "Course Details:",
        response.data
      );

      setCourse(response.data.course);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to load course"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    getCourse();
  }, [id]);


  // ================= ENROLL =================

  const handleEnroll = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login as a student to enroll in a course.");
      navigate("/login");
      return;
    }

    if (user.role !== "student") {
      alert("Only students can enroll in courses.");
      return;
    }

    try {

      setEnrolling(true);

      const response = await api.post(
        "/enrollments",
        {
          courseId: id,
        }
      );

      alert(
        response.data.message ||
        "Enrollment successful"
      );

      navigate("/student/courses");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to enroll"
      );

    } finally {

      setEnrolling(false);

    }
  };


  // ================= LOADING =================

  if (loading) {

    return (
      <div className="course-details">
        <h2>Loading course...</h2>
      </div>
    );

  }


  // ================= NOT FOUND =================

  if (!course) {

    return (
      <div className="course-details">
        <h2>Course not found</h2>
      </div>
    );

  }


  return (

    <div className="course-details">

      <div className="course-banner">

        {/* ================= LEFT ================= */}

        <div className="course-left">

          <span>Best Seller</span>

          <h1>
            {course.title}
          </h1>

          <p>
            {course.description}
          </p>

          <div className="course-meta">

            <span>
              👨‍🏫{" "}
              {course.teacher?.name ||
                "Teacher"}
            </span>

            <span>
              ⌛ {course.duration}
            </span>

            <span>
              🌐 English
            </span>

          </div>

          <h2>
            ₹{course.price}
          </h2>

          <button
            onClick={handleEnroll}
            disabled={enrolling}
          >
            {enrolling
              ? "Enrolling..."
              : "Enroll Now"}
          </button>

        </div>


        {/* ================= RIGHT ================= */}

        <div className="course-right">

          <img
            src={
              course.image ||
              "https://placehold.co/900x500"
            }
            alt={course.title}
          />

        </div>

      </div>

    </div>

  );
};

export default CourseDetails;