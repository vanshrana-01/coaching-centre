import { useEffect, useState } from "react";
import AdminStudentTable from "../AdminStudentTable/AdminStudentTable";
import api from "../../../api/axios";
import "./AdminStudents.css";

const AdminStudents = () => {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= GET STUDENTS =================

  const getStudents = async () => {
    try {
      const response = await api.get("/admin/users");

      console.log("Admin Users:", response.data);

      const allUsers = response.data.users || [];

      const studentUsers = allUsers.filter(
        (user) => user.role === "student"
      );

      setStudents(studentUsers);

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to load students"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  // ================= SEARCH =================

  const filtered = students.filter((student) => {
    const searchText = search.toLowerCase();

    return (
      student.name?.toLowerCase().includes(searchText) ||
      student.email?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="admin-students">

      {/* ================= HEADER ================= */}

      <div className="students-header">

        <div>
          <h1>Manage Students</h1>

          <p>
            View, edit and manage all students.
          </p>
        </div>

        <button>
          + Add Student
        </button>

      </div>


      {/* ================= SEARCH ================= */}

      <input
        type="text"
        placeholder="Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


      {/* ================= TABLE ================= */}

      {loading ? (
        <p>Loading students...</p>
      ) : filtered.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <AdminStudentTable
          students={filtered}
          onDelete={(id) => {
            setStudents((prev) =>
              prev.filter((student) => student._id !== id)
            );
          }}
        />
      )}

    </div>
  );
};

export default AdminStudents;