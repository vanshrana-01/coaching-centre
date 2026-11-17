const express = require("express");

const {
  markAttendance,
  getMyAttendance,
  getCourseAttendance,
  getAttendanceSummary,
} = require("../controllers/attendance.controller");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/role.middleware");

const { validateAttendance } = require("../middleware/validation.middleware");

const router = express.Router();

// Teacher - Mark Attendance
router.post(
  "/",
  authMiddleware,
  roleMiddleware("teacher"),
  validateAttendance,
  markAttendance
);

// Student - Get My Attendance
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("student"),
  getMyAttendance
);

// Teacher - Get Course Attendance
router.get(
  "/course/:courseId",
  authMiddleware,
  roleMiddleware("teacher"),
  getCourseAttendance
);

// Student - Get Attendance Summary
router.get(
  "/summary",
  authMiddleware,
  roleMiddleware("student"),
  getAttendanceSummary
);

module.exports = router;