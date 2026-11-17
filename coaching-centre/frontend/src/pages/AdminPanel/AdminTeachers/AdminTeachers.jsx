import { useEffect, useState } from "react";
import AdminTeacherTable from "../AdminTeacherTable/AdminTeacherTable";
import api from "../../../api/axios";
import "./AdminTeachers.css";

const AdminTeachers = () => {
  const [search, setSearch] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= GET TEACHERS =================

  const getTeachers = async () => {
    try {
      const response = await api.get("/admin/users");

      console.log("Admin Users:", response.data);

      const allUsers = response.data.users || [];

      const teacherUsers = allUsers.filter(
        (user) => user.role === "teacher"
      );

      setTeachers(teacherUsers);

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to load teachers"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  // ================= SEARCH =================

  const filtered = teachers.filter((teacher) => {
    const searchText = search.toLowerCase();

    return (
      teacher.name?.toLowerCase().includes(searchText) ||
      teacher.email?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="admin-teachers">

      {/* ================= HEADER ================= */}

      <div className="teachers-header">

        <div>
          <h1>Manage Teachers</h1>

          <p>
            View, edit and manage all teachers.
          </p>
        </div>

        <button>
          + Add Teacher
        </button>

      </div>


      {/* ================= SEARCH ================= */}

      <input
        type="text"
        placeholder="Search teacher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


      {/* ================= TABLE ================= */}

      {loading ? (
        <p>Loading teachers...</p>
      ) : filtered.length === 0 ? (
        <p>No teachers found.</p>
      ) : (
        <AdminTeacherTable
          teachers={filtered}
          onDelete={(id) => {
            setTeachers((prev) =>
              prev.filter(
                (teacher) => teacher._id !== id
              )
            );
          }}
        />
      )}

    </div>
  );
};

export default AdminTeachers;