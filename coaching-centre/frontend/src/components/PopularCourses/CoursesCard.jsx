
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./CoursesCard.css";

const CoursesCard = ({ course }) => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // ================= ENROLL =================

  const handleEnroll = async () => {

    try {

      // Login user check
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      // ================= NOT LOGGED IN =================

      if (!user) {

        alert(
          "Please login as a student to enroll in a course."
        );

        navigate("/login");

        return;
      }


      // ================= ROLE CHECK =================

      if (user.role !== "student") {

        alert(
          "Only students can enroll in courses."
        );

        return;
      }


      // ================= ENROLL =================

      setLoading(true);

      const response = await api.post(
        "/enrollments",
        {
          courseId: course._id,
        }
      );

      console.log(
        "Enrollment:",
        response.data
      );

      alert(
        response.data.message ||
        "Enrollment successful"
      );

      // My Courses
      navigate("/student/courses");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to enroll in course"
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="course-card">

      {/* ================= IMAGE ================= */}

      <img
        src={
          course?.image ||
          "https://placehold.co/350x180"
        }
        alt={
          course?.title ||
          "Course"
        }
      />


      {/* ================= COURSE INFO ================= */}

      <h3>
        {course?.title}
      </h3>


      <p>
        Instructor :{" "}
        {course?.teacher?.name ||
          "Teacher"}
      </p>


      <p>
        ⌛ {course?.duration || "N/A"}
      </p>


      <h4>
        ₹{course?.price || "0"}
      </h4>


      {/* ================= ENROLL ================= */}

      <button
        onClick={handleEnroll}
        disabled={loading}
      >

        {loading
          ? "Enrolling..."
          : "Enroll Now"}

      </button>

    </div>

  );
};

export default CoursesCard;
