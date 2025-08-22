const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const { initiatePayment, chapaCallback, getPaymentStatus, getPaymentHistory } = require("../controllers/paymentController");

// Start payment (Chapa)
router.post("/initiate", requireAuth, initiatePayment);

// Chapa callback
router.get("/chapa/callback", chapaCallback);

// Check payment status
router.get("/:id/status", requireAuth, getPaymentStatus);

// Payment history
router.get("/history", requireAuth, getPaymentHistory);

module.exports = router;
