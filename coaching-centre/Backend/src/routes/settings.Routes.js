const express = require("express");

const {
  getSettings,
  updateSettings,
} = require("../controllers/settings.controller");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();


// GET SETTINGS

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getSettings
);


// UPDATE SETTINGS

router.put(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  updateSettings
);


module.exports = router;