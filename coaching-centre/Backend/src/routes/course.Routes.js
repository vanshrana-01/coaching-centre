
const express = require("express");

const {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  getTeacherCourses,
  getTeacherStudentCount,
  getTeacherStudents,
  getHomeTeachers,
} = require("../controllers/course.controller");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/role.middleware");
const upload = require("../middleware/upload.middleware");

const {
  validateCourse,
} = require("../middleware/validation.middleware");

const router = express.Router();

// PUBLIC
router.get("/", getAllCourses);
router.get("/home/teachers", getHomeTeachers);

// TEACHER
router.post(
  "/teacher/create",
  authMiddleware,
  roleMiddleware("teacher"),
  upload.single("image"),
  validateCourse,
  createCourse
);

router.get(
  "/teacher/my-courses",
  authMiddleware,
  roleMiddleware("teacher"),
  getTeacherCourses
);

router.get(
  "/teacher/student-count",
  authMiddleware,
  roleMiddleware("teacher"),
  getTeacherStudentCount
);

router.get(
  "/teacher/students",
  authMiddleware,
  roleMiddleware("teacher"),
  getTeacherStudents
);

// ADMIN
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  validateCourse,
  createCourse
);

// UPDATE
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "teacher"),
  upload.single("image"),
  updateCourse
);

// DELETE
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "teacher"),
  deleteCourse
);

// SINGLE COURSE
router.get("/:id", getSingleCourse);

module.exports = router;
