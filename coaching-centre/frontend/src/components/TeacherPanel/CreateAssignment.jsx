import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "./TeacherPanel.css";

const CreateAssignment = () => {
  const [courses, setCourses] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [dueDate, setDueDate] = useState("");

  // ==================== GET TEACHER COURSES ====================

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await api.get(
          "/courses/teacher/my-courses"
        );

        console.log("Teacher Courses:", response.data);

        setCourses(response.data.courses || []);

      } catch (error) {
        console.log(
          error.response?.data?.message ||
          error.message
        );
      }
    };

    getCourses();
  }, []);


  // ==================== CREATE ASSIGNMENT ====================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/assignments",
        {
          title,
          description,
          course,
          dueDate,
        }
      );

      console.log(
        "Assignment:",
        response.data
      );

      alert("Assignment created successfully!");

      // Clear form
      setTitle("");
      setDescription("");
      setCourse("");
      setDueDate("");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Assignment creation failed"
      );
    }
  };


  return (
    <div className="create-assignment-page">

      <div className="create-assignment-container">

        {/* ==================== HEADER ==================== */}

        <div className="create-assignment-header">

          <h1>Create Assignment</h1>

          <p>
            Create a new assignment for your students.
          </p>

        </div>


        {/* ==================== FORM ==================== */}

        <form
          className="assignment-form"
          onSubmit={handleSubmit}
        >

          {/* Title */}

          <div className="assignment-input-group">

            <label>
              Assignment Title
            </label>

            <input
              type="text"
              placeholder="Enter assignment title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
            />

          </div>


          {/* Description */}

          <div className="assignment-input-group">

            <label>
              Description
            </label>

            <textarea
              placeholder="Enter assignment description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              required
            />

          </div>


          {/* Course */}

          <div className="assignment-input-group">

            <label>
              Select Course
            </label>

            <select
              value={course}
              onChange={(e) =>
                setCourse(e.target.value)
              }
              required
            >

              <option value="">
                Select Course
              </option>

              {courses.map((item) => (

                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.title}
                </option>

              ))}

            </select>

          </div>


          {/* Due Date */}

          <div className="assignment-input-group">

            <label>
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
              required
            />

          </div>


          {/* Submit */}

          <button
            type="submit"
            className="create-assignment-button"
          >
            Create Assignment
          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateAssignment;