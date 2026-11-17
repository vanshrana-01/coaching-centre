import { useEffect, useState } from "react";
import api from "../../api/axios";
import TeacherAttendanceTable from "./TeacherAttendanceTable";
import "./TeacherPanel.css";

const Attendance = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ================= GET TEACHER COURSES =================

  const getCourses = async () => {
    try {
      const response = await api.get("/courses/teacher/my-courses");

      setCourses(response.data.courses || []);
    } catch (error) {
      console.log(
        error.response?.data?.message || error.message
      );
    }
  };

  // ================= GET COURSE STUDENTS =================

  const getStudents = async (courseId) => {
    if (!courseId) {
      setStudents([]);
      return;
    }

    try {
      setLoading(true);

      const response = await api.get(
        `/courses/${courseId}/students`
      );

      const courseStudents = response.data.students || [];

      // Existing attendance for selected date
      let attendanceRecords = [];

      try {
        const attendanceResponse = await api.get(
          `/attendance/course/${courseId}`
        );

        attendanceRecords =
          attendanceResponse.data.attendance || [];
      } catch (error) {
        console.log("Attendance fetch error:", error);
      }

      const selectedStudents = courseStudents.map(
        (student) => {
          const record = attendanceRecords.find(
            (attendance) =>
              attendance.student?._id === student._id &&
              new Date(attendance.date)
                .toISOString()
                .split("T")[0] === selectedDate
          );

          return {
            ...student,
            todayPresent: record
              ? record.status === "present"
              : false,
          };
        }
      );

      setStudents(selectedStudents);
    } catch (error) {
      console.log(
        error.response?.data?.message || error.message
      );

      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= INITIAL LOAD =================

  useEffect(() => {
    const loadData = async () => {
      await getCourses();
      setLoading(false);
    };

    loadData();
  }, []);

  // ================= COURSE CHANGE =================

  useEffect(() => {
    if (selectedCourse) {
      getStudents(selectedCourse);
    }
  }, [selectedCourse, selectedDate]);

  // ================= TOGGLE ATTENDANCE =================

  const toggleAttendance = (studentId) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student._id === studentId
          ? {
              ...student,
              todayPresent: !student.todayPresent,
            }
          : student
      )
    );
  };

  // ================= SAVE ATTENDANCE =================

  const saveAttendance = async () => {
    if (!selectedCourse) {
      alert("Please select a course");
      return;
    }

    if (students.length === 0) {
      alert("No students found");
      return;
    }

    try {
      setSaving(true);

      for (const student of students) {
        await api.post("/attendance", {
          student: student._id,
          course: selectedCourse,
          date: selectedDate,
          status: student.todayPresent
            ? "present"
            : "absent",
        });
      }

      alert("Attendance saved successfully");

      await getStudents(selectedCourse);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to save attendance"
      );
    } finally {
      setSaving(false);
    }
  };

  // ================= SUMMARY =================

  const presentToday = students.filter(
    (student) => student.todayPresent
  ).length;

  const absentToday =
    students.length - presentToday;

  // ================= LOADING =================

  if (loading && courses.length === 0) {
    return (
      <div className="teacher-attendance">
        <h2>Loading attendance...</h2>
      </div>
    );
  }

  // ================= UI =================

  return (
    <div className="teacher-attendance">

      {/* HEADER */}

      <div className="attendance-heading">

        <div>
          <h1>Attendance</h1>

          <p>
            Manage attendance of your students.
          </p>
        </div>

        <button
          className="save-attendance-btn"
          onClick={saveAttendance}
          disabled={saving || students.length === 0}
        >
          {saving
            ? "Saving..."
            : "Save Attendance"}
        </button>

      </div>

      {/* CONTROLS */}

      <div className="attendance-controls">

        <div>
          <label>Course</label>

          <select
            value={selectedCourse}
            onChange={(e) =>
              setSelectedCourse(e.target.value)
            }
          >
            <option value="">
              Select Course
            </option>

            {courses.map((course) => (
              <option
                key={course._id}
                value={course._id}
              >
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Date</label>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) =>
              setSelectedDate(e.target.value)
            }
          />
        </div>

      </div>

      {/* SUMMARY */}

      <div className="attendance-summary">

        <div>
          <span>Total Students</span>
          <strong>{students.length}</strong>
        </div>

        <div>
          <span>Present Today</span>
          <strong>{presentToday}</strong>
        </div>

        <div>
          <span>Absent Today</span>
          <strong>{absentToday}</strong>
        </div>

      </div>

      {/* STUDENTS */}

      {!selectedCourse ? (
        <p>Please select a course.</p>
      ) : loading ? (
        <p>Loading students...</p>
      ) : students.length === 0 ? (
        <p>No students found in this course.</p>
      ) : (
        <TeacherAttendanceTable
          students={students}
          onToggle={toggleAttendance}
        />
      )}

    </div>
  );
};

export default Attendance;