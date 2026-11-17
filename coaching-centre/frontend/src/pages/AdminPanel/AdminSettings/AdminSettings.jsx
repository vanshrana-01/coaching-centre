
import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import "./AdminSettings.css";

const AdminSettings = () => {

  // ==================== SETTINGS ====================

  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);
  const [maintenance, setMaintenance] = useState(false);

  // ==================== PASSWORD ====================

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(true);

  // ==================== LOAD SETTINGS ====================

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await api.get("/settings");
        const settings = response.data.settings || {};
        setEmail(settings.emailNotifications ?? true);
        setSms(settings.smsNotifications ?? false);
        setMaintenance(settings.maintenanceMode ?? false);
      } catch (error) {
        console.log(error);
      } finally {
        setSettingsLoading(false);
      }
    };
    loadSettings();
  }, []);

  // ==================== CHANGE PASSWORD ====================

  const handleChangePassword = async () => {

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill all password fields");
      return;
    }

    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters");
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

      alert(response.data.message);

      // Clear password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to change password"
      );

    } finally {

      setLoading(false);

    }
  };

  // ==================== SAVE SETTINGS ====================

  const handleSaveSettings = async () => {
    try {
      const response = await api.put("/settings", {
        emailNotifications: email,
        smsNotifications: sms,
        maintenanceMode: maintenance,
      });
      alert(response.data.message || "Settings saved successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save settings");
    }
  };

  return (

    <div className="admin-settings">

      {/* ================= HEADER ================= */}

      <div className="settings-header">

        <h1>Admin Settings</h1>

        <p>
          Manage application preferences
        </p>

      </div>


      {/* ================= NOTIFICATIONS ================= */}

      <div className="settings-card">

        <h2>Notifications</h2>

        <div className="setting-row">

          <span>
            Email Notifications
          </span>

          <input
            type="checkbox"
            checked={email}
            onChange={() => setEmail(!email)}
          />

        </div>


        <div className="setting-row">

          <span>
            SMS Notifications
          </span>

          <input
            type="checkbox"
            checked={sms}
            onChange={() => setSms(!sms)}
          />

        </div>

      </div>


      {/* ================= SYSTEM ================= */}

      <div className="settings-card">

        <h2>System</h2>

        <div className="setting-row">

          <span>
            Maintenance Mode
          </span>

          <input
            type="checkbox"
            checked={maintenance}
            onChange={() =>
              setMaintenance(!maintenance)
            }
          />

        </div>

      </div>


      {/* ================= SECURITY ================= */}

      <div className="settings-card">

        <h2>Security</h2>

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
          type="button"
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
        className="save-btn"
        onClick={handleSaveSettings}
      >
        Save Changes
      </button>

    </div>
  );
};

export default AdminSettings;