import { useEffect, useState } from "react";
import api from "../../../api/axios";
import "./Reports.css";

const Reports = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const getReports = async () => {
    try {
      const response = await api.get(
        "/admin/reports"
      );

      console.log("Reports:", response.data);

      setReport(response.data);

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to load reports"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  if (loading) {
    return (
      <div className="admin-reports">
        <h1>Reports & Analytics</h1>
        <p>Loading reports...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="admin-reports">
        <h1>Reports & Analytics</h1>
        <p>Unable to load reports.</p>
      </div>
    );
  }

  return (
    <div className="admin-reports">

      {/* HEADER */}

      <div className="reports-header">

        <div>
          <h1>Reports & Analytics</h1>

          <p>
            Overview of students, revenue and courses.
          </p>
        </div>

        <button>
          Download Report
        </button>

      </div>


      {/* REPORT CARDS */}

      <div className="report-cards">

        <div className="report-card">
          <h3>Total Revenue</h3>

          <h2>
            ₹
            {Number(
              report.totalRevenue || 0
            ).toLocaleString("en-IN")}
          </h2>

          <span>
            From paid payments
          </span>
        </div>


        <div className="report-card">
          <h3>Total Students</h3>

          <h2>
            {report.totalStudents}
          </h2>

          <span>
            Registered students
          </span>
        </div>


        <div className="report-card">
          <h3>Total Enrollments</h3>

          <h2>
            {report.totalEnrollments}
          </h2>

          <span>
            Course enrollments
          </span>
        </div>

      </div>


      {/* REPORT GRID */}

      <div className="reports-grid">

        {/* POPULAR COURSES */}

        <div className="chart-card">

          <h3>Popular Courses</h3>

          {report.popularCourses.length === 0 ? (

            <p>No course data available.</p>

          ) : (

            report.popularCourses
              .slice(0, 5)
              .map((course) => {

                const maxStudents =
                  report.popularCourses[0]
                    ?.students || 1;

                const percentage =
                  (course.students /
                    maxStudents) *
                  100;

                return (
                  <div
                    className="course-report"
                    key={course.id}
                  >

                    <p>
                      {course.title}

                      <strong>
                        {course.students}
                      </strong>
                    </p>

                    <div className="line">

                      <div
                        style={{
                          width:
                            `${percentage}%`,
                        }}
                      ></div>

                    </div>

                  </div>
                );
              })

          )}

        </div>


        {/* SUMMARY */}

        <div className="chart-card">

          <h3>Course Overview</h3>

          <div className="overview-report">

            <div>
              <span>Total Courses</span>

              <strong>
                {report.totalCourses}
              </strong>
            </div>

            <div>
              <span>Total Students</span>

              <strong>
                {report.totalStudents}
              </strong>
            </div>

            <div>
              <span>Total Enrollments</span>

              <strong>
                {report.totalEnrollments}
              </strong>
            </div>

            <div>
              <span>Revenue</span>

              <strong>
                ₹
                {Number(
                  report.totalRevenue || 0
                ).toLocaleString("en-IN")}
              </strong>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Reports;