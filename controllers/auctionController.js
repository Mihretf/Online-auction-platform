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
};
