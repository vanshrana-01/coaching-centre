import "./AdminTeacherTable.css";
import api from "../../../api/axios";

const AdminTeacherTable = ({ teachers, onDelete }) => {

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/admin/users/${id}`);

      alert("Teacher deleted successfully");

      onDelete(id);

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete teacher"
      );
    }
  };

  return (
    <table className="admin-teacher-table">

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

        {teachers.map((teacher) => (

          <tr key={teacher._id}>

            <td>
              {teacher.name}
            </td>

            <td>
              {teacher.email}
            </td>

            <td>
              <span className="teacher-role">
                {teacher.role}
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
                  handleDelete(teacher._id)
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

export default AdminTeacherTable;