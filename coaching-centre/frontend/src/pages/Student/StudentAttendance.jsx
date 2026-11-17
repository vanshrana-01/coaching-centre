import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "./StudentPanel.css";

const StudentAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [summary, setSummary] = useState({
    totalClasses: 0,
    present: 0,
    absent: 0,
    attendancePercentage: 0,
  });

  const [loading, setLoading] = useState(true);

  // ================= GET ATTENDANCE =================

  const getAttendance = async () => {
    try {
      const response = await api.get("/attendance/my");

      setAttendance(response.data.attendance || []);
    } catch (error) {
      console.log(
        error.response?.data?.message || error.message
      );
    }
  };

  // ================= GET SUMMARY =================

  const getSummary = async () => {
    try {
      const response = await api.get(
        "/attendance/summary"
      );

      setSummary({
        totalClasses:
          response.data.totalClasses || 0,

        present:
          response.data.present || 0,

        absent:
          response.data.absent || 0,

        attendancePercentage:
          response.data.attendancePercentage || 0,
      });
    } catch (error) {
      console.log(
        error.response?.data?.message || error.message
      );
    }
  };

  // ================= LOAD =================

  useEffect(() => {
    const loadAttendance = async () => {
      await Promise.all([
        getAttendance(),
        getSummary(),
      ]);

      setLoading(false);
    };

    loadAttendance();
  }, []);

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="student-attendance">
        <h2>Loading attendance...</h2>
      </div>
    );
  }

  // ================= UI =================

  return (
    <div className="student-attendance">

      {/* HEADER */}

      <div className="student-attendance-heading">
        <div>
          <h1>My Attendance</h1>

          <p>
            View your attendance records and
            attendance percentage.
          </p>
        </div>
      </div>

      {/* SUMMARY */}

      <div className="student-attendance-summary">

        <div className="attendance-summary-card">
          <span>Total Classes</span>
          <strong>{summary.totalClasses}</strong>
        </div>

        <div className="attendance-summary-card">
          <span>Present</span>
          <strong>{summary.present}</strong>
        </div>

        <div className="attendance-summary-card">
          <span>Absent</span>
          <strong>{summary.absent}</strong>
        </div>

        <div className="attendance-summary-card">
          <span>Attendance</span>
          <strong>
            {summary.attendancePercentage}%
          </strong>
        </div>

      </div>

      {/* ATTENDANCE TABLE */}

      {attendance.length === 0 ? (
        <div className="no-attendance">
          <h2>No Attendance Records</h2>

          <p>
            Your attendance has not been marked yet.
          </p>
        </div>
      ) : (
        <div className="student-attendance-table-wrapper">

          <table className="student-attendance-table">

            <thead>
              <tr>
                <th>Course</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {attendance.map((record) => (
                <tr key={record._id}>

                  <td>
                    {record.course?.title ||
                      "Course"}
                  </td>

                  <td>
                    {new Date(
                      record.date
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <span
                      className={
                        record.status === "present"
                          ? "attendance-present"
                          : "attendance-absent"
                      }
                    >
                      {record.status}
                    </span>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default StudentAttendance;