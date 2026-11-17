
import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import "./AdminTopbar.css";

const AdminTopbar = () => {
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
    <header className="admin-topbar">

      <div className="topbar-left">
        <h2>Admin Dashboard</h2>
      </div>

      <div className="topbar-right">

        <input
          type="text"
          placeholder="Search..."
        />

        <button className="notification-btn">
          🔔
        </button>

        <div className="admin-profile">
          <img
            src={
              user?.profileImage ||
              "https://i.pravatar.cc/40?img=12"
            }
            alt="Admin"
          />

          <span>{user?.name || "Loading..."}</span>
        </div>

      </div>

    </header>
  );
};

export default AdminTopbar;
