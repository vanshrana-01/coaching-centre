const express = require("express");

const {
  createPayment,
  getAllPayments,
  getPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/payment.controller");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

// ==================== ADMIN ====================

// Create Payment
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createPayment
);

// Get All Payments
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAllPayments
);

// Get Single Payment
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  getPayment
);

// Update Payment
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updatePayment
);

// Delete Payment
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deletePayment
);

module.exports = router;