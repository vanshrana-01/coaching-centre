import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmpassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      console.log("Register:", response.data);

      // Save JWT
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Registration successful");

      // Role based redirect
      if (response.data.user.role === "student") {
        navigate("/student/dashboard");
      } 
      else if (
        response.data.user.role === "teacher"
      ) {
        navigate("/teacher/dashboard");
      }

    } catch (error) {
      console.log("Register Error:", error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-container">

        <div className="register-header">

          <h2>Create Account 🎉</h2>

          <p>
            Join us and start your journey today
          </p>

        </div>

        <form
          className="register-form"
          onSubmit={handleSubmit}
        >

          <div className="input-group">

            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          </div>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          <div className="input-group">

            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmpassword}
              onChange={(e) =>
                setConfirmpassword(e.target.value)
              }
            />

          </div>

          {/* ROLE */}

          <div className="input-group">

            <label>Register As</label>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
            >

              <option value="student">
                Student
              </option>

              <option value="teacher">
                Teacher
              </option>

            </select>

          </div>

          <div className="register-option">

            <label>

              <input
                type="checkbox"
                required
              />

              I agree to the Terms & Conditions

            </label>

          </div>

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Register"}

          </button>

          <p className="login-link">

            Already have an account?

            <span>

              <NavLink to="/login">
                {" "}Login
              </NavLink>

            </span>

          </p>

        </form>

      </div>

    </div>
  );
};

export default Register;