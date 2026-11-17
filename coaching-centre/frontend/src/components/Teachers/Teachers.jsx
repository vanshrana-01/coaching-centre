import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Teachers.css";
import TeacherCard from "./TeacherCard";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get("/courses/home/teachers");

        setTeachers(response.data.teachers);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="Teacher">

      <div className="section-title">
        <h2>Meet our Expert Mentor</h2>

        <p>
          Learn from experienced industry professionals who have
          worked on real-world project
        </p>
      </div>

      <div className="teachers-container">

        {loading ? (
          <p>Loading teachers...</p>
        ) : teachers.length === 0 ? (
          <p>No teachers available.</p>
        ) : (
          teachers.map((teacher) => (
            <TeacherCard
              key={teacher._id}
              teacher={teacher}
            />
          ))
        )}

      </div>

    </div>
  );
};

export default Teachers;
