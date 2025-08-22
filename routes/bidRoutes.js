const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const { placeBid, getHighestForItem } = require("../controllers/bidController");

router.post("/place", requireAuth, placeBid);
router.get("/highest/:itemId", getHighestForItem);

module.exports = router;
