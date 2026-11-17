const express = require("express");

const {
  enrollCourse,
  getMyCourses,
  getCourseStudents,
} = require("../controllers/enrollment.controller");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/role.middleware");

const {
  validateEnrollment,
} = require("../middleware/validation.middleware");

const router = express.Router();

// ==================== STUDENT ENROLL ====================

router.post(
  "/",
  authMiddleware,
  roleMiddleware("student"),
  validateEnrollment,
  enrollCourse
);

// ==================== STUDENT MY COURSES ====================

router.get(
  "/my-courses",
  authMiddleware,
  roleMiddleware("student"),
  getMyCourses
);

// ==================== TEACHER COURSE STUDENTS ====================

router.get(
  "/course/:courseId/students",
  authMiddleware,
  roleMiddleware("teacher"),
  getCourseStudents
);

module.exports = router;