
import React, { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./TeacherPanel.css";

const CreateCourse = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      alert("Please select only JPG or PNG image");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB");
      e.target.value = "";
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Submit course
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.price.trim() ||
      !formData.duration.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    if (!image) {
      alert("Please select a course image");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("duration", formData.duration);
      data.append("image", image);

      const response = await api.post(
        "/courses/teacher/create",
        data
      );

      console.log("Course created:", response.data);

      alert("Course created successfully!");

      navigate("/teacher/my-courses");

    } catch (error) {
      console.log("Create course error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to create course"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-course-page">
      <div className="create-course-container">

        <h1>Create New Course</h1>

        <p>Create a course for your students.</p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Course Title</label>

            <input
              type="text"
              name="title"
              placeholder="Enter course title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Enter course description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Price</label>

            <input
              type="text"
              name="price"
              placeholder="45000"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Duration</label>

            <input
              type="text"
              name="duration"
              placeholder="6 Months"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>

          {/* Course Image Upload */}
          <div className="input-group">
            <label>Course Image</label>

            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleImageChange}
            />

            <small>JPG or PNG | Maximum size: 5 MB</small>
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="course-image-preview">
              <p>Image Preview</p>

              <img
                src={preview}
                alt="Course Preview"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <button
                type="button"
                onClick={() => {
                  URL.revokeObjectURL(preview);
                  setPreview("");
                  setImage(null);
                }}
              >
                Remove Image
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Create Course"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
