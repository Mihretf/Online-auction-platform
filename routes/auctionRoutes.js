const express = require('express');
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

module.exports = router;
