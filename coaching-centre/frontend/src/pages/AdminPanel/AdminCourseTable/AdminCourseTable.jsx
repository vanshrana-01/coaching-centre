import "./AdminCourseTable.css";

const AdminCourseTable = ({ courses, onDelete }) => {

  return (

    <div className="course-table-wrapper">

      <table className="course-table">

        <thead>

          <tr>

            <th>Course</th>

            <th>Teacher</th>

            <th>Duration</th>

            <th>Fee</th>

            <th>Students</th>

            <th>Action</th>

          </tr>

        </thead>


        <tbody>

          {courses.map((course) => (

            <tr key={course._id}>

              {/* COURSE */}

              <td>
                {course.title}
              </td>


              {/* TEACHER */}

              <td>
                {course.teacher?.name ||
                  "Not Assigned"}
              </td>


              {/* DURATION */}

              <td>
                {course.duration}
              </td>


              {/* FEE */}

              <td>
                ₹{course.price}
              </td>


              {/* STUDENTS */}

              <td>
                {course.studentCount || 0}
              </td>


              {/* ACTION */}

              <td>

                <button
                  className="edit-btn"
                  onClick={() =>
                    console.log(
                      "Edit course:",
                      course._id
                    )
                  }
                >
                  Edit
                </button>


                <button
                  className="delete-btn"
                  onClick={() => onDelete(course._id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
};

export default AdminCourseTable;