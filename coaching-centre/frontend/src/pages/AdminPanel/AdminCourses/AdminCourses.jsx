import { useEffect, useState } from "react";
import AdminCourseTable from "../AdminCourseTable/AdminCourseTable";
import api from "../../../api/axios";
import "./AdminCourses.css";

const AdminCourses = () => {

  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);


  // ==================== GET COURSES ====================

  const getCourses = async () => {

    try {

      const response = await api.get(
        "/admin/courses"
      );

      console.log(
        "Admin Courses:",
        response.data
      );

      setCourses(
        response.data.courses || []
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to load courses"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    getCourses();
  }, []);


  // ==================== SEARCH ====================

  const filteredCourses = courses.filter(
    (course) => {

      const searchText =
        search.toLowerCase();

      return (
        course.title
          ?.toLowerCase()
          .includes(searchText) ||

        course.teacher?.name
          ?.toLowerCase()
          .includes(searchText)
      );

    }
  );


  return (

    <div className="admin-courses">

      {/* ================= HEADER ================= */}

      <div className="courses-header">

        <div>

          <h1>
            Manage Courses
          </h1>

          <p>
            Create, edit and manage all courses.
          </p>

        </div>

        <button>
          + Add Course
        </button>

      </div>


      {/* ================= SEARCH ================= */}

      <input
        type="text"
        placeholder="Search course..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />


      {/* ================= CONTENT ================= */}

      {loading ? (

        <div className="courses-message">
          <p>Loading courses...</p>
        </div>

      ) : filteredCourses.length === 0 ? (

        <div className="courses-message">
          <p>No courses found.</p>
        </div>

      ) : (

        <AdminCourseTable
          courses={filteredCourses}
          onDelete={async (id) => {
            if (!window.confirm("Delete this course?")) return;
            try {
              await api.delete(`/courses/${id}`);
              setCourses((prev) => prev.filter((course) => course._id !== id));
              alert("Course deleted successfully");
            } catch (error) {
              alert(error.response?.data?.message || "Failed to delete course");
            }
          }}
        />

      )}

    </div>
  );
};

export default AdminCourses;