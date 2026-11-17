import { useEffect, useState } from "react";
import api from "../../../api/axios";
import AdminAssignmentTable from "../AdminAssignmentTable/AdminAssignmentTable";
import "./AdminAssignments.css";

const AdminAssignments = () => {

  const [assignments, setAssignments] = useState([]);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // ================= GET ALL ASSIGNMENTS =================

  const getAllAssignments = async () => {
    try {

      const response = await api.get(
        "/assignments/admin/all"
      );

      console.log(
        "Admin Assignments:",
        response.data
      );

      setAssignments(
        response.data.assignments || []
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to load assignments"
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    getAllAssignments();
  }, []);


  // ================= FILTER =================

  const filteredAssignments = assignments.filter(
    (assignment) => {

      const matchesSearch =
        assignment.title
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesCourse =
        courseFilter === "All" ||
        assignment.course?.title === courseFilter;

      return matchesSearch && matchesCourse;
    }
  );


  // ================= UNIQUE COURSES =================

  const courses = [
    ...new Set(
      assignments
        .map((assignment) => assignment.course?.title)
        .filter(Boolean)
    ),
  ];


  // ================= LOADING =================

  if (loading) {

    return (
      <div className="admin-assignments">

        <h1>Manage Assignments</h1>

        <p>Loading assignments...</p>

      </div>
    );

  }


  return (

    <div className="admin-assignments">

      {/* ================= HEADER ================= */}

      <div className="assignments-header">

        <div>

          <h1>Manage Assignments</h1>

          <p>
            View and manage all assignments.
          </p>

        </div>

      </div>


      {/* ================= SUMMARY ================= */}

      <div className="assignment-summary">

        <div>

          <span>
            Total Assignments
          </span>

          <strong>
            {assignments.length}
          </strong>

        </div>


        <div>

          <span>
            Active
          </span>

          <strong>
            {
              assignments.filter(
                (item) =>
                  new Date(item.dueDate) >=
                  new Date()
              ).length
            }
          </strong>

        </div>


        <div>

          <span>
            Total Assignments
          </span>

          <strong>
            {assignments.length}
          </strong>

        </div>

      </div>


      {/* ================= FILTERS ================= */}

      <div className="assignment-filters">

        <input
          type="text"
          placeholder="Search assignment..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />


        <select
          value={courseFilter}
          onChange={(e) =>
            setCourseFilter(e.target.value)
          }
        >

          <option value="All">
            All Courses
          </option>

          {courses.map((course) => (

            <option
              key={course}
              value={course}
            >
              {course}
            </option>

          ))}

        </select>

      </div>


      {/* ================= TABLE ================= */}

      {filteredAssignments.length === 0 ? (

        <div className="no-assignments">

          <h3>
            No Assignments Found
          </h3>

          <p>
            There are no assignments matching your search.
          </p>

        </div>

      ) : (

        <AdminAssignmentTable
          assignments={filteredAssignments}
        />

      )}

    </div>
  );
};

export default AdminAssignments;