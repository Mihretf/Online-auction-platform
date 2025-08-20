const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');
const authMiddleware = require('../middleware/auth');

// Create a new auction
router.post('/', auctionController.createAuction);

// Get all auctions
router.get('/', auctionController.getAllAuctions);

// Get single auction by ID
router.get('/:id', auctionController.getAuctionById);

// Update auction
router.patch('/:id', auctionController.updateAuction);

// Delete auction
router.delete('/:id', auctionController.deleteAuction);

module.exports = router;
