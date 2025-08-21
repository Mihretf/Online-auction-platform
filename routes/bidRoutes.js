const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const bidController = require('../controllers/bidController');

// Place a new bid
router.post('/', authMiddleware, bidController.placeBid);

// Get all bids for a specific auction
router.get('/auction/:auctionId', authMiddleware, bidController.getBidsForAuction);

// Get all bids by the logged-in user
router.get('/my-bids', authMiddleware, bidController.getUserBids);

module.exports = router;
