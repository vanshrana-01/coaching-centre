import React, { useState } from "react";
import api from "../../api/axios";
import "./TeacherPanel.css";

const TeacherSettings = () => {
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] =
    useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [currentPassword, setCurrentPassword] =
    useState("");
  const [newPassword, setNewPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  // ================= CHANGE PASSWORD =================

  const handleChangePassword = async () => {
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
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
          "Password changed successfully"
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to change password"
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

  // ================= DARK MODE =================

  const handleDarkMode = () => {
    const newValue = !darkMode;

    setDarkMode(newValue);

    if (newValue) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  return (
    <div className="teacher-settings">

      <div className="settings-heading">
        <h1>Settings</h1>

        <p>
          Manage your account and application preferences.
        </p>
      </div>

      {/* ================= NOTIFICATIONS ================= */}

      <div className="settings-card">

        <h2>Notifications</h2>

        <div className="setting-row">

          <div>
            <h3>Push Notifications</h3>

            <p>
              Receive notifications about assignments and
              students.
            </p>
          </div>

          <label className="toggle">

            <input
              type="checkbox"
              checked={notifications}
              onChange={() =>
                setNotifications(!notifications)
              }
            />

            <span></span>

          </label>

        </div>

        <div className="setting-row">

          <div>
            <h3>Email Notifications</h3>

            <p>
              Receive important updates through email.
            </p>
          </div>

          <label className="toggle">

            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() =>
                setEmailNotifications(
                  !emailNotifications
                )
              }
            />

            <span></span>

          </label>

        </div>

      </div>

      {/* ================= APPEARANCE ================= */}

      <div className="settings-card">

        <h2>Appearance</h2>

        <div className="setting-row">

          <div>
            <h3>Dark Mode</h3>

            <p>
              Change the appearance of your dashboard.
            </p>
          </div>

          <label className="toggle">

            <input
              type="checkbox"
              checked={darkMode}
              onChange={handleDarkMode}
            />

            <span></span>

          </label>

        </div>

      </div>

      {/* ================= SECURITY ================= */}

      <div className="settings-card">

        <h2>Security</h2>

        <div className="password-section">

          <div className="input-group">

            <label>Current Password</label>

            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
            />

          </div>

          <div className="input-group">

            <label>New Password</label>

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
            />

          </div>

          <div className="input-group">

            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

          </div>

        </div>

        <button
          className="change-password-btn"
          onClick={handleChangePassword}
          disabled={loading}
        >
          {loading
            ? "Changing Password..."
            : "Change Password"}
        </button>

      </div>

      {/* ================= SAVE ================= */}

      <button
        className="save-settings-btn"
        onClick={() =>
          alert("Settings saved successfully")
        }
      >
        Save Changes
      </button>

      {/* ================= LOGOUT ================= */}

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  );
};

export default TeacherSettings;