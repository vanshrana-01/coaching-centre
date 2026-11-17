
import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Topbar.css";

const Topbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await api.get("/auth/profile");
        setUser(response.data.user);
      } catch (error) {
        console.log(
          error.response?.data?.message || error.message
        );
      }
    };

    getProfile();
  }, []);

  return (
    <div className="header">
      <div className="topbar-left">
        <h2>Student Dashboard</h2>
      </div>

      <div className="topbar-right">
        <input
          type="text"
          placeholder="Search Courses..."
        />

        <button className="notification-btn">
          🔔
        </button>

        <div className="profile">
          <img
            src={
              user?.profileImage ||
              "https://i.pravatar.cc/40"
            }
            alt="Profile"
          />

          <span>{user?.name || "Loading..."}</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
