import "./TeacherPanel.css";

const TeacherAttendanceTable = ({
  students,
  attendance,
  onToggle,
}) => {
  return (
    <div className="attendance-table-wrapper">

      <table className="attendance-table">

        <thead>
          <tr>
            <th>Student</th>
            <th>Email</th>
            <th>Today's Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student) => {

            const isPresent =
              attendance[student._id] === "present";

            return (
              <tr key={student._id}>

                <td>
                  <div className="attendance-student">

                    <div className="attendance-avatar">
                      {student.name
                        ?.charAt(0)
                        ?.toUpperCase() || "S"}
                    </div>

                    <strong>
                      {student.name}
                    </strong>

                  </div>
                </td>

                <td>
                  {student.email}
                </td>

                <td>
                  <span
                    className={
                      isPresent
                        ? "present-status"
                        : "absent-status"
                    }
                  >
                    {isPresent
                      ? "Present"
                      : "Absent"}
                  </span>
                </td>

                <td>

                  <button
                    className={
                      isPresent
                        ? "present-btn"
                        : "absent-btn"
                    }
                    onClick={() =>
                      onToggle(student._id)
                    }
                  >
                    {isPresent
                      ? "Present"
                      : "Absent"}
                  </button>

                </td>

              </tr>
            );
          })}

        </tbody>

      </table>

    </div>
  );
};

export default TeacherAttendanceTable;