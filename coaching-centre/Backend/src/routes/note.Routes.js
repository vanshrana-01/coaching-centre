const express = require("express");

const { createNote,getCourseNotes } = require("../controllers/note.controller");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/role.middleware");
const {validateNote,} = require("../middleware/validation.middleware");
const upload = require("../middleware/upload.middleware");

const router = express.Router();

// Teacher only
router.post(
  "/",
  authMiddleware,
  roleMiddleware("teacher"),
  upload.single("file"),
  validateNote,
  createNote
);
router.get("/course/:courseId",authMiddleware,getCourseNotes);
module.exports = router;