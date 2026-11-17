import "./AdminAssignmentTable.css";

const AdminAssignmentTable = ({ assignments }) => {

  return (

    <div className="assignment-table-wrapper">

      <table className="assignment-table">

        <thead>

          <tr>

            <th>Assignment</th>
            <th>Course</th>
            <th>Teacher</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>

          </tr>

        </thead>


        <tbody>

          {assignments.map((assignment) => {

            const dueDate =
              new Date(assignment.dueDate);

            const isActive =
              dueDate >= new Date();


            return (

              <tr
                key={assignment._id}
              >

                <td>

                  <strong>
                    {assignment.title}
                  </strong>

                </td>


                <td>

                  {assignment.course?.title ||
                    "N/A"}

                </td>


                <td>

                  {assignment.teacher?.name ||
                    "N/A"}

                </td>


                <td>

                  {dueDate.toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}

                </td>


                <td>

                  <span
                    className={
                      isActive
                        ? "active"
                        : "closed"
                    }
                  >

                    {isActive
                      ? "Active"
                      : "Closed"}

                  </span>

                </td>


                <td>

                  <button
                    className="view-btn"
                    onClick={() =>
                      alert(
                        assignment.description ||
                        "No description available"
                      )
                    }
                  >
                    View
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

export default AdminAssignmentTable;