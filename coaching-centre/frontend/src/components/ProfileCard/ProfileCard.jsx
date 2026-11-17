
import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "./ProfileCard.css";

const ProfileCard = () => {
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
      console.log(error.response?.data?.message || error.message);
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
      alert("Image must be smaller than 5MB");
      return;
    }

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please choose an image first");
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

      alert("Profile picture uploaded successfully!");
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
    return <div className="profile-card">Loading profile...</div>;
  }

  if (!user) {
    return <div className="profile-card">Profile not found</div>;
  }

  return (
    <div className="profile-card">
      <h2>My Profile</h2>

      <div className="profile-image-container">
        <img
          src={
            preview ||
            user.profileImage ||
            "https://i.pravatar.cc/150"
          }
          alt="Profile"
          className="profile-image"
        />
      </div>

      <h3>{user.name}</h3>

      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <div className="profile-upload">
        <label htmlFor="profile-image">
          Choose File
        </label>

        <input
          id="profile-image"
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleImageChange}
        />

        {selectedImage && (
          <>
            <p className="selected-file">
              Selected: {selectedImage.name}
            </p>

            <button
              className="upload-btn"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Picture"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
