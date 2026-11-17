const express = require("express");

const {
  getDashboardStats,
  getAllUsers,
  deleteUser,
  updateUserRole,
  getAllCourses,
  getReports
} = require("../controllers/admin.controller");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/role.middleware");


const router = express.Router();


// ==================== DASHBOARD ====================

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  getDashboardStats
);


// ==================== USERS ====================

router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsers
);


router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);


router.put(
  "/users/:id/role",
  authMiddleware,
  roleMiddleware("admin"),
  updateUserRole
);


// ==================== COURSES ====================

router.get(
  "/courses",
  authMiddleware,
  roleMiddleware("admin"),
  getAllCourses
);
router.get(
  "/reports",
  authMiddleware,
  roleMiddleware("admin"),
  getReports
);

module.exports = router;