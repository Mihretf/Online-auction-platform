const express = require("express");
const { placeBid } = require("../controllers/bidController");

const router = express.Router();

// @route   POST /api/bids/place
// @desc    Place a bid on an auction item
router.post("/place", placeBid);

module.exports = router;
