import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import api from "../../api/axios";

import "./TeacherPanel.css";


const EditClass = () => {

  const { id } = useParams();

  const navigate = useNavigate();


  const [courses, setCourses] =
    useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      course: "",
      date: "",
      duration: "",
      meetingLink: "",
    });

  const [loading, setLoading] =
    useState(true);

  const [updating, setUpdating] =
    useState(false);


  // ================= GET CLASS =================

  const getClass = async () => {

    try {

      const response = await api.get(
        "/classes/my-classes"
      );

      const currentClass =
        response.data.classes.find(
          (item) =>
            item._id === id
        );

      if (!currentClass) {

        alert("Class not found");

        navigate(
          "/teacher/my-classes"
        );

        return;
      }


      setFormData({
        title:
          currentClass.title || "",

        course:
          currentClass.course?._id ||
          "",

        date:
          currentClass.date
            ? new Date(
                currentClass.date
              )
                .toISOString()
                .slice(0, 16)
            : "",

        duration:
          currentClass.duration || "",

        meetingLink:
          currentClass.meetingLink || "",
      });

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to load class"
      );

    } finally {

      setLoading(false);

    }
  };


  // ================= GET COURSES =================

  const getCourses = async () => {

    try {

      const response = await api.get(
        "/courses/teacher/my-courses"
      );

      setCourses(
        response.data.courses || []
      );

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {

    getClass();
    getCourses();

  }, [id]);


  // ================= CHANGE =================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // ================= UPDATE =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setUpdating(true);

      await api.put(
        `/classes/${id}`,
        {
          ...formData,

          duration:
            Number(formData.duration),
        }
      );

      alert(
        "Class updated successfully"
      );

      navigate(
        "/teacher/my-classes"
      );

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to update class"
      );

    } finally {

      setUpdating(false);

    }
  };


  if (loading) {

    return (
      <div className="create-class-page">

        <h2>
          Loading class...
        </h2>

      </div>
    );
  }


  return (

    <div className="create-class-page">

      <div className="create-class-container">

        <div className="create-class-header">

          <h1>
            Edit Class
          </h1>

          <p>
            Update your scheduled class.
          </p>

        </div>


        <form
          className="create-class-form"
          onSubmit={handleSubmit}
        >

          <div className="input-group">

            <label>
              Class Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

          </div>


          <div className="input-group">

            <label>
              Course
            </label>

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
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


          <div className="input-group">

            <label>
              Duration
            </label>

            <input
              type="number"
              name="duration"
              min="1"
              value={formData.duration}
              onChange={handleChange}
              required
            />

          </div>


          <div className="input-group">

            <label>
              Meeting Link
            </label>

            <input
              type="url"
              name="meetingLink"
              value={formData.meetingLink}
              onChange={handleChange}
            />

          </div>


          <button
            type="submit"
            disabled={updating}
          >

            {updating
              ? "Updating..."
              : "Update Class"}

          </button>

        </form>

      </div>

    </div>
  );
};

export default EditClass;