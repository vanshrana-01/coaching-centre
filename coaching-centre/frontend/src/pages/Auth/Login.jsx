import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("Login response:", response.data);

      // Backend se token aur user data
      const token = response.data.token;
      const user = response.data.user;

      // Local Storage me save
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful");

      // Role ke according dashboard
      if (user.role === "student") {
        navigate("/student/dashboard");
      } else if (user.role === "teacher") {
        navigate("/teacher/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      }

    } catch (error) {
      console.log("Login error:", error);

      alert(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-header">
          <h2>Welcome Back 👋</h2>
          <p>Login to continue your journey</p>
        </div>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <div className="input-group">
            <label>Email</label>

            <input
              required
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              required
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="login-option">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
          </div>

          <button type="submit">
            Login
          </button>

          <p className="register-link">
            Don't have an account?
            <span>
              <NavLink to="/register">
                Register
              </NavLink>
            </span>
          </p>

        </form>

      </div>
    </div>
  );
};

export default Login;