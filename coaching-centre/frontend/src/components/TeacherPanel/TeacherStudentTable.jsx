
import "./TeacherPanel.css";

const TeacherStudentTable = ({ students }) => {
  return (
    <div className="student-table-wrapper">

      <table className="student-table">

        <thead>
          <tr>
            <th>Student</th>
            <th>Email</th>
            <th>Course</th>
            <th>Progress</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student) => (

            <tr key={student._id}>

              {/* STUDENT */}

              <td>

                <div className="student-info">

                  <div className="student-avatar">
                    {student.name
                      ?.charAt(0)
                      ?.toUpperCase() || "S"}
                  </div>

                  <span>
                    {student.name || "Student"}
                  </span>

                </div>

              </td>

              {/* EMAIL */}

              <td>
                {student.email || "No email"}
              </td>

              {/* COURSE */}

              <td>
                {student.course || "Course"}
              </td>

              {/* PROGRESS */}

              <td>

                <div className="progress-container">

                  <div className="progress-bar">

                    <div
                      className="progress-fill"
                      style={{
                        width: `${student.progress || 0}%`,
                      }}
                    ></div>

                  </div>

                  <span>
                    {student.progress || 0}%
                  </span>

                </div>

              </td>

              {/* STATUS */}

              <td>

                <span
                  className={`student-status ${
                    student.status?.toLowerCase() ||
                    "active"
                  }`}
                >
                  {student.status || "Active"}
                </span>

              </td>

              {/* ACTION */}

              <td>

                <button
                  className="view-student-btn"
                  onClick={() =>
                    alert(
                      `Student: ${student.name}\nEmail: ${student.email}`
                    )
                  }
                >
                  View
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default TeacherStudentTable;
