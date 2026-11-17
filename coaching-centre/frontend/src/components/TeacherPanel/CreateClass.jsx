import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "./TeacherPanel.css"

const CreateClass = () => {
  const [courses, setCourses] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    course: "",
    date: "",
    duration: "",
    meetingLink: "",
  });

  const [loading, setLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(true);

  // ================= GET TEACHER COURSES =================

  const getTeacherCourses = async () => {
    try {
      const response = await api.get(
        "/courses/teacher/my-courses"
      );

      console.log("Teacher Courses:", response.data);

      setCourses(response.data.courses || []);

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to load courses"
      );
    } finally {
      setCoursesLoading(false);
    }
  };

  useEffect(() => {
    getTeacherCourses();
  }, []);

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= CREATE CLASS =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.course ||
      !formData.date ||
      !formData.duration
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/classes",
        {
          title: formData.title,
          course: formData.course,
          date: formData.date,
          duration: Number(formData.duration),
          meetingLink: formData.meetingLink,
        }
      );

      console.log(response.data);

      alert("Class created successfully");

      setFormData({
        title: "",
        course: "",
        date: "",
        duration: "",
        meetingLink: "",
      });

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to create class"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-class-page">

      <div className="create-class-container">

        {/* ================= HEADER ================= */}

        <div className="create-class-header">

          <h1>Create New Class</h1>

          <p>
            Schedule a live class for your students.
          </p>

        </div>

        {/* ================= FORM ================= */}

        <form
          className="create-class-form"
          onSubmit={handleSubmit}
        >

          {/* TITLE */}

          <div className="input-group">

            <label>
              Class Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter class title"
              value={formData.title}
              onChange={handleChange}
              required
            />

          </div>


          {/* COURSE */}

          <div className="input-group">

            <label>
              Select Course
            </label>

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >

              <option value="">
                {coursesLoading
                  ? "Loading courses..."
                  : "Select a course"}
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


          {/* DATE & TIME */}

          <div className="input-group">

            <label>
              Date & Time
            </label>

            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

          </div>


          {/* DURATION */}

          <div className="input-group">

            <label>
              Duration (minutes)
            </label>

            <input
              type="number"
              name="duration"
              placeholder="60"
              min="1"
              value={formData.duration}
              onChange={handleChange}
              required
            />

          </div>


          {/* MEETING LINK */}

          <div className="input-group">

            <label>
              Meeting Link
            </label>

            <input
              type="url"
              name="meetingLink"
              placeholder="https://meet.google.com/..."
              value={formData.meetingLink}
              onChange={handleChange}
            />

          </div>


          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Creating Class..."
              : "Create Class"}

          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateClass;