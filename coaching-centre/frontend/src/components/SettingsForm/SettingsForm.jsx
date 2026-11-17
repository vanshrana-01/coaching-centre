import React, { useState } from "react";
import api from "../../api/axios";
import "./SettingForm.css";

const SettingsForm = () => {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  // ================= CHANGE PASSWORD =================

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await api.put(
        "/auth/change-password",
        {
          currentPassword,
          newPassword,
        }
      );

      alert(
        response.data.message ||
        "Password updated successfully"
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div className="settings-card">

      <h2>Change Password</h2>

      <form onSubmit={handlePasswordChange}>

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Updating..."
            : "Update Password"}
        </button>

      </form>

      <hr />

      <h2>Notifications</h2>

      <label>
        <input
          type="checkbox"
          defaultChecked
        />
        Email Notifications
      </label>

      <label>
        <input
          type="checkbox"
          defaultChecked
        />
        Course Updates
      </label>

      <label>
        <input
          type="checkbox"
          defaultChecked
        />
        Assignment Reminders
      </label>

      <hr />

      <h2>Appearance</h2>

      <label>
        <input type="checkbox" />
        Dark Mode
      </label>

      <hr />

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  );
};

export default SettingsForm;