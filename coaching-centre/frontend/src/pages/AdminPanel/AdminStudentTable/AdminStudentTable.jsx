import "./AdminStudentTable.css";
import api from "../../../api/axios";

const AdminStudentTable = ({ students, onDelete }) => {

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/admin/users/${id}`);

      alert("Student deleted successfully");

      onDelete(id);

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete student"
      );
    }
  };

  return (
    <table className="admin-table">

      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>

        {students.map((student) => (

          <tr key={student._id}>

            <td>
              {student.name}
            </td>

            <td>
              {student.email}
            </td>

            <td>
              <span className="student-role">
                {student.role}
              </span>
            </td>

            <td>
              <span className="active">
                Active
              </span>
            </td>

            <td>

              <button>
                Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(student._id)
                }
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
};

export default AdminStudentTable;