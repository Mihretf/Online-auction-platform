const express = require('express');
<<<<<<< HEAD
const { 
  createAuction, 
  getAllAuctions, 
  getAuctionById 
} = require('../controllers/auctionController');

const router = express.Router();

// @route   POST /api/auctions
// @desc    Create a new auction
router.post('/', createAuction);

// @route   GET /api/auctions
// @desc    Get all auctions
router.get('/', getAllAuctions);

// @route   GET /api/auctions/:id
// @desc    Get auction by ID
router.get('/:id', getAuctionById);
=======
const router = express.Router();
const auctionController = require('../controllers/auctionController');
const authMiddleware = require('../middleware/auth');

// Create a new auction
router.post('/', authMiddleware, auctionController.createAuction);

// Get all auctions
router.get('/', authMiddleware, auctionController.getAllAuctions);

// Get single auction by ID
router.get('/:id', authMiddleware, auctionController.getAuctionById);

// Update auction
router.patch('/:id', authMiddleware, auctionController.updateAuction);

// Delete auction
router.delete('/:id', authMiddleware, auctionController.deleteAuction);
>>>>>>> 142e4870217515e54b80e8285df7168206c5cb4f

module.exports = router;
