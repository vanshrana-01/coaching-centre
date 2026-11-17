const express = require("express");

const {
  registerUser,
  loginUser,
} = require("../controllers/auth.Controller");

const {
  validateRegister,
  validateLogin,
} = require("../middleware/validation.middleware");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

// ==================== AUTH ====================

// Register
router.post(
  "/register",
  validateRegister,
  registerUser
);

// Login
router.post(
  "/login",
  validateLogin,
  loginUser
);

// ==================== USER PROTECTED ROUTES ====================

// Student protected test
router.get(
  "/student",
  authMiddleware,
  roleMiddleware("student"),
  (req, res) => {
    res.status(200).json({
      message: "Student route working",
      user: req.user,
    });
  }
);

// Teacher protected test
router.get(
  "/teacher",
  authMiddleware,
  roleMiddleware("teacher"),
  (req, res) => {
    res.status(200).json({
      message: "Teacher route working",
      user: req.user,
    });
  }
);

// Admin protected test
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.status(200).json({
      message: "Admin route working",
      user: req.user,
    });
  }
);

module.exports = router;