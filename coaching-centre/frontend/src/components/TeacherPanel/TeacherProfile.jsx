
import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "./TeacherPanel.css";

const TeacherProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const getProfile = async () => {
    try {
      const response = await api.get("/auth/profile");
      setUser(response.data.user);
    } catch (error) {
      console.log(
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Only JPG and PNG images are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please choose a picture first");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await api.put(
        "/auth/profile/image",
        formData
      );

      setUser((prev) => ({
        ...prev,
        profileImage: response.data.profileImage,
      }));

      setSelectedImage(null);
      setPreview("");

      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Profile picture upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="teacher-profile">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="teacher-profile">
        <h2>Profile not found</h2>
      </div>
    );
  }

  return (
    <div className="teacher-profile">

      <div className="profile-heading">
        <div>
          <h1>My Profile</h1>
          <p>
            Manage your personal and professional
            information.
          </p>
        </div>

        <button className="edit-profile-btn">
          Edit Profile
        </button>
      </div>

      <div className="profile-container">

        <div className="profile-card">

          <div className="profile-image">
            <img
              src={
                preview ||
                user.profileImage ||
                "https://i.pravatar.cc/150"
              }
              alt="Teacher Profile"
            />
          </div>

          <h2>{user.name}</h2>

          <p>Teacher</p>

          <div className="profile-status">
            Active
          </div>

          <div className="teacher-image-upload">

            <label htmlFor="teacher-profile-image">
              Choose File
            </label>

            <input
              id="teacher-profile-image"
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleImageChange}
            />

            {selectedImage && (
              <>
                <p>{selectedImage.name}</p>

                <button
                  className="upload-profile-btn"
                  onClick={handleUpload}
                  disabled={uploading}
                >
                  {uploading
                    ? "Uploading..."
                    : "Upload Picture"}
                </button>
              </>
            )}

          </div>

        </div>

        <div className="profile-details">

          <h2>Personal Information</h2>

          <div className="details-grid">

            <div className="detail-item">
              <span>Full Name</span>
              <strong>{user.name}</strong>
            </div>

            <div className="detail-item">
              <span>Email</span>
              <strong>{user.email}</strong>
            </div>

            <div className="detail-item">
              <span>Role</span>
              <strong>{user.role}</strong>
            </div>

            <div className="detail-item">
              <span>Account Created</span>
              <strong>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </strong>
            </div>

          </div>

          <div className="about-teacher">
            <h2>About Me</h2>

            <p>
              Software development instructor
              responsible for teaching students,
              managing assignments and attendance,
              and reviewing student submissions.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default TeacherProfile;
