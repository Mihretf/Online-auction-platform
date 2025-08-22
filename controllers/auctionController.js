<<<<<<< HEAD
const Auction = require('../models/auctionModel');
const User = require('../models/userModel');

// Create a new auction
exports.createAuction = async (req, res) => {
  try {
    const { title, description, startingBid, endTime, sellerId } = req.body;

    // Validate required fields
    if (!title || !description || !startingBid || !endTime || !sellerId) {
      return res.status(400).json({ 
        message: 'Title, description, starting bid, end time, and seller ID are required' 
      });
    }

    // Check if seller exists
    const seller = await User.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    // Create new auction
    const newAuction = new Auction({
      title,
      description,
      startingBid,
      currentBid: startingBid,
      endTime: new Date(endTime),
      seller: sellerId,
      status: 'active'
    });

    const savedAuction = await newAuction.save();
    await savedAuction.populate('seller', 'username email');

    res.status(201).json({
      message: 'Auction created successfully',
      auction: savedAuction
    });

  } catch (error) {
    console.error('Error creating auction:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
};

// Get all auctions
exports.getAllAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find()
      // .populate('seller', 'username email')
      .sort({ createdAt: -1 });

    res.status(200).json(auctions);
  } catch (error) {
    console.error('Error fetching auctions:', error);
    res.status(500).json({ 
      message: 'Error fetching auctions',
      error: error.message 
    });
  }
};

// Get auction by ID
exports.getAuctionById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const auction = await Auction.findById(id)
      .populate('seller', 'username email')
      .populate('bidders', 'username email');

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    res.status(200).json(auction);
  } catch (error) {
    console.error('Error fetching auction:', error);
    res.status(500).json({ 
      message: 'Error fetching auction',
      error: error.message 
    });
  }
=======
const auctionService = require('../services/auctionService'); // Import auction service

// Controller to create a new auction
function createAuction(req, res) {
    auctionService.createAuction(req.body) // Pass auction data from request body
        .then(auction => res.status(201).json(auction)) // Return created auction
        .catch(error => res.status(400).json({ message: error.message })); // Handle errors
}

// Controller to get all auctions
function getAllAuctions(req, res) {
    auctionService.getAllAuctions() // Fetch ongoing and upcoming auctions
        .then(auctions => res.json(auctions)) // Return list
        .catch(error => res.status(400).json({ message: error.message }));
}

// Controller to get single auction by ID
function getAuctionById(req, res) {
    auctionService.getAuctionById(req.params.id) // Fetch auction by ID
        .then(auction => res.json(auction)) // Return auction with highest bid
        .catch(error => res.status(404).json({ message: error.message })); // 404 if not found
}

// Controller to update auction
function updateAuction(req, res) {
    auctionService.updateAuction(req.params.id, req.body) // Pass update data
        .then(updated => res.json(updated)) // Return updated auction
        .catch(error => res.status(400).json({ message: error.message }));
}

// Controller to delete auction
function deleteAuction(req, res) {
    auctionService.deleteAuction(req.params.id) // Delete auction by ID
        .then(result => res.json(result)) // Return confirmation
        .catch(error => res.status(400).json({ message: error.message }));
}

// Export all auction controllers
module.exports = {
    createAuction,
    getAllAuctions,
    getAuctionById,
    updateAuction,
    deleteAuction
>>>>>>> 142e4870217515e54b80e8285df7168206c5cb4f
};
