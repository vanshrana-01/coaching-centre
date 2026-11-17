const express = require("express");

const {
  submitAssignment,
  getAssignmentSubmissions,
  getMySubmissions,
  checkSubmission,
  getTeacherPendingCount,
} = require("../controllers/submission.controller");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/role.middleware");

const {
  validateSubmission,
} = require("../middleware/validation.middleware");

const router = express.Router();


// ==================== STUDENT SUBMIT ====================

router.post(
  "/",
  authMiddleware,
  roleMiddleware("student"),
  validateSubmission,
  submitAssignment
);


// ==================== STUDENT MY SUBMISSIONS ====================

router.get(
  "/my-submissions",
  authMiddleware,
  roleMiddleware("student"),
  getMySubmissions
);


// ==================== TEACHER GET SUBMISSIONS ====================

router.get(
  "/teacher/pending",
  authMiddleware,
  roleMiddleware("teacher"),
  getTeacherPendingCount
);

router.get(
  "/assignment/:assignmentId",
  authMiddleware,
  roleMiddleware("teacher"),
  getAssignmentSubmissions
);


// ==================== TEACHER CHECK ====================

router.put(
  "/:id/check",
  authMiddleware,
  roleMiddleware("teacher"),
  checkSubmission
);


module.exports = router;