
import { useEffect, useState } from "react";
import api from "../../api/axios";
import TeacherStudentTable from "./TeacherStudentTable";
import "./TeacherPanel.css";

const Students = () => {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStudents = async () => {
    try {
      const response = await api.get(
        "/courses/teacher/students"
      );

      console.log("Teacher Students:", response.data);

      setStudents(response.data.students || []);
    } catch (error) {
      console.log(
        error.response?.data?.message ||
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const courses = [
    "All",
    ...new Set(
      students.map((student) => student.course)
    ),
  ];

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      student.name
        ?.toLowerCase()
        .includes(searchText) ||
      student.email
        ?.toLowerCase()
        .includes(searchText);

    const matchesCourse =
      courseFilter === "All" ||
      student.course === courseFilter;

    return matchesSearch && matchesCourse;
  });

  if (loading) {
    return (
      <div className="teacher-students">
        <h2>Loading students...</h2>
      </div>
    );
  }

  return (
    <div className="teacher-students">

      {/* HEADER */}

      <div className="students-heading">

        <div>
          <h1>Students</h1>

          <p>
            Manage students enrolled in your courses.
          </p>
        </div>

        <div className="total-students">
          Total Students:{" "}
          <strong>{students.length}</strong>
        </div>

      </div>

      {/* FILTERS */}

      <div className="student-filters">

        <input
          type="text"
          placeholder="Search student..."
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
          {courses.map((course) => (
            <option
              key={course}
              value={course}
            >
              {course === "All"
                ? "All Courses"
                : course}
            </option>
          ))}
        </select>

      </div>

      {/* TABLE */}

      {filteredStudents.length === 0 ? (

        <div className="no-students">
          <h2>No Students Found</h2>

          <p>
            No students match your search or course filter.
          </p>
        </div>

      ) : (

        <TeacherStudentTable
          students={filteredStudents}
        />

      )}

    </div>
  );
};

export default Students;
