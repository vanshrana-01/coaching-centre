
import React from "react";
import "./TeacherCard.css";

const TeacherCard = ({ teacher }) => {
  return (
    <div className="teacher-card">

      <img
        src={teacher.image || "/default-teacher.png"}
        alt={teacher.name}
      />

      <h3>{teacher.name}</h3>

      <p>{teacher.role || "Expert Mentor"}</p>

      <p>
        {teacher.experience || "Experienced professional"}
      </p>

      <button>View Profile</button>

    </div>
  );
};

export default TeacherCard;
