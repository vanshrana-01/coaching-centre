import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "./StatsCard.css";

const StatsCard = () => {
  const [totalCourses, setTotalCourses] = useState(0);
  const [loading, setLoading] = useState(true);

  const getMyCourses = async () => {
    try {
      const response = await api.get(
        "/enrollments/my-courses"
      );

      const courses =
        response.data.courses || [];

      setTotalCourses(courses.length);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyCourses();
  }, []);

  return (
    <div className="stats-grid">

      <div className="stat-card">
        <h2>
          {loading ? "..." : totalCourses}
        </h2>
        <p>Total Courses</p>
      </div>

      <div className="stat-card">
        <h2>0%</h2>
        <p>Learning</p>
      </div>

      <div className="stat-card">
        <h2>0h</h2>
        <p>Hours Learned</p>
      </div>

      <div className="stat-card">
        <h2>0</h2>
        <p>Certificates</p>
      </div>

    </div>
  );
};

export default StatsCard;