
import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyCourseCard.css";

const MyCourseCard = ({ course }) => {

  const navigate = useNavigate();

  const handleContinue = () => {

    navigate(`/student/courses/${course._id}`);

  };


  return (

    <div className="my-course-card">

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


      <div className="course-content">

        <h3>
          {course?.title || "Course"}
        </h3>


        <p>
          Instructor :{" "}
          {course?.teacher?.name ||
            "Teacher"}
        </p>


        <p>
          Duration :{" "}
          {course?.duration ||
            "N/A"}
        </p>


        <p>
          Price : ₹
          {course?.price || "0"}
        </p>


        <div className="progress-bar">

          <div
            className="progress"
            style={{
              width: "0%"
            }}
          ></div>

        </div>


        <span>
          0% Completed
        </span>


        <button
          onClick={handleContinue}
        >
          Continue Learning
        </button>

      </div>

    </div>

  );

};

export default MyCourseCard;
