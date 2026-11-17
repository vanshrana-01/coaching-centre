import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
  });

  const [loading, setLoading] = useState(true);

  const getDashboardStats = async () => {
    try {
      const response = await api.get("/admin/dashboard");

      console.log("Admin Dashboard:", response.data);

      setStats({
        totalStudents: response.data.totalStudents || 0,
        totalTeachers: response.data.totalTeachers || 0,
        totalCourses: response.data.totalCourses || 0,
      });
    } catch (error) {
      console.log(
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardStats();
  }, []);

  return (
    <div className="admin-dashboard">

      {/* ================= HEADER ================= */}

      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>

        <p>
          Welcome back! Here's an overview of your coaching center.
        </p>
      </div>


      {/* ================= STATS ================= */}

      <div className="stats-grid">

        <div className="stat-card blue">
          <h2>
            {loading ? "..." : stats.totalStudents}
          </h2>

          <p>Total Students</p>
        </div>


        <div className="stat-card green">
          <h2>
            {loading ? "..." : stats.totalTeachers}
          </h2>

          <p>Total Teachers</p>
        </div>


        <div className="stat-card orange">
          <h2>
            {loading ? "..." : stats.totalCourses}
          </h2>

          <p>Total Courses</p>
        </div>


        <div className="stat-card purple">
          <h2>—</h2>

          <p>Total Revenue</p>
        </div>

      </div>


      {/* ================= BOTTOM SECTION ================= */}

      <div className="dashboard-bottom">

        <div className="dashboard-card">

          <h3>Recent Admissions</h3>

          <div className="admission-row">
            <span>No admission data available</span>
          </div>

        </div>


        <div className="dashboard-card">

          <h3>Course Overview</h3>

          <div className="overview-item">
            <span>Total Courses</span>

            <strong>
              {loading ? "..." : stats.totalCourses}
            </strong>
          </div>

          <div className="overview-item">
            <span>Total Students</span>

            <strong>
              {loading ? "..." : stats.totalStudents}
            </strong>
          </div>

          <div className="overview-item">
            <span>Total Teachers</span>

            <strong>
              {loading ? "..." : stats.totalTeachers}
            </strong>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;