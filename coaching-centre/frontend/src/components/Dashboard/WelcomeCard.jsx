
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./WelcomeCard.css";

const WelcomeCard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await api.get("/auth/profile");
        setUser(response.data.user);
      } catch (error) {
        console.log(
          error.response?.data?.message || error.message
        );

        const savedUser = JSON.parse(
          localStorage.getItem("user") || "null"
        );

        setUser(savedUser);
      }
    };

    getProfile();
  }, []);

  const handleContinueLearning = () => {
    navigate("/student/courses");
  };

  return (
    <div className="welcome-card">

      <div className="welcome-content">

        <h1>
          Welcome Back {user?.name || "Student"} 👋
        </h1>

        <p>
          Continue your learning journey and complete your courses.
        </p>

        <button onClick={handleContinueLearning}>
          Continue Learning
        </button>

      </div>

      <div className="welcome-image">
        <img
          src={
            user?.profileImage ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
          }
          alt="Student"
        />
      </div>

    </div>
  );
};

export default WelcomeCard;
