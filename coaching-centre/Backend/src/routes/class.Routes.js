const express = require("express");

const {
  createClass,
  getMyClasses,
  getUpcomingClasses,
  updateClass,
  deleteClass,
} = require("../controllers/class.controller");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();


// ================= TEACHER CREATE =================

router.post(
  "/",
  authMiddleware,
  roleMiddleware("teacher"),
  createClass
);


// ================= TEACHER MY CLASSES =================

router.get(
  "/my-classes",
  authMiddleware,
  roleMiddleware("teacher"),
  getMyClasses
);


// ================= STUDENT UPCOMING =================

router.get(
  "/upcoming",
  authMiddleware,
  roleMiddleware("student"),
  getUpcomingClasses
);


// ================= TEACHER UPDATE =================

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("teacher"),
  updateClass
);


// ================= TEACHER DELETE =================

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("teacher"),
  deleteClass
);


module.exports = router;