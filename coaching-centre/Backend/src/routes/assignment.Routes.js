const express = require("express");

const {
  createAssignment,
  getCourseAssignments,
  getAssignment,
  getTeacherAssignments,
  updateAssignment,
  deleteAssignment,
  getAllAssignments,
  getTeacherAssignmentCount,
} = require("../controllers/assignment.controller");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

// ==================== TEACHER ====================

// Create Assignment
router.post(
  "/",
  authMiddleware,
  roleMiddleware("teacher"),
  createAssignment
);

// Teacher's assignments
router.get(
  "/teacher/my-assignments",
  authMiddleware,
  roleMiddleware("teacher"),
  getTeacherAssignments
);

// Update Assignment
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("teacher"),
  updateAssignment
);

// Delete Assignment
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("teacher"),
  deleteAssignment
);


router.get(
  "/teacher/count",
  authMiddleware,
  roleMiddleware("teacher"),
  getTeacherAssignmentCount
);

// ==================== ADMIN ====================

// Get All Assignments
router.get(
  "/admin/all",
  authMiddleware,
  roleMiddleware("admin"),
  getAllAssignments
);


// ==================== STUDENT ====================

// Get assignments of a course
router.get(
  "/course/:courseId",
  authMiddleware,
  getCourseAssignments
);

// Get single assignment
router.get(
  "/:id",
  authMiddleware,
  getAssignment
);

module.exports = router;