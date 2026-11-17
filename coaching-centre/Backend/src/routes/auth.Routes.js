
const express = require("express");

const {
  registerUser,
  loginUser,
  changePassword,
  getProfile,
  updateProfileImage,
} = require("../controllers/auth.Controller");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload.middleware");

const router = express.Router();

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

// CHANGE PASSWORD
router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

// GET PROFILE
router.get(
  "/profile",
  authMiddleware,
  getProfile
);

// UPDATE PROFILE IMAGE
router.put(
  "/profile/image",
  authMiddleware,
  upload.single("image"),
  updateProfileImage
);

module.exports = router;
