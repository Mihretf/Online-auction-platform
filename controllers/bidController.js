const Bid = require('../models/bidModel');
const Auction = require('../models/auctionModel');

// Place a bid on an auction item
exports.placeBid = async (req, res) => {
  try {
    const { auctionId, amount, type = "manual", maxBid } = req.body;

    // Validate required fields
    if (!auctionId || !amount) {
      return res.status(400).json({ 
        message: 'Auction ID and bid amount are required' 
      });
    }

    // Find the auction
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Check if auction is still active
    if (auction.status !== 'active') {
      return res.status(400).json({ 
        message: 'Cannot bid on inactive auction' 
      });
    }

    // Check if bid amount is higher than current highest bid
    if (amount <= auction.currentBid) {
      return res.status(400).json({ 
        message: `Bid amount must be higher than current bid of $${auction.currentBid}` 
      });
    }

    // Create a new bid
    const newBid = new Bid({
      auctionId,
      bidderId: req.user?.id || req.body.bidderId, // Handle case where user might not be authenticated
      amount,
      type,
      maxBid: type === "proxy" ? maxBid : undefined,
      status: "pending"
    });

    // Save the bid
    const savedBid = await newBid.save();

    // Update auction's current bid if this is higher
    await Auction.findByIdAndUpdate(auctionId, {
      currentBid: amount,
      $push: { bids: savedBid._id }
    });

    // Populate bidder information before sending response
    await savedBid.populate('bidderId', 'username email');

    res.status(201).json({
      message: 'Bid placed successfully',
      bid: savedBid
    });

  } catch (error) {
    console.error('Error placing bid:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
};

// Get all bids for an auction
exports.getBidsForAuction = async (req, res) => {
  try {
    const { auctionId } = req.params;
    
    const bids = await Bid.find({ auctionId })
      .populate('bidderId', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json(bids);
  } catch (error) {
    console.error('Error fetching bids:', error);
    res.status(500).json({ 
      message: 'Error fetching bids',
      error: error.message 
    });
  }
};

// Get user's bids
exports.getUserBids = async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId;
    
    const bids = await Bid.find({ bidderId: userId })
      .populate('auctionId', 'title currentBid status')
      .sort({ createdAt: -1 });

    res.status(200).json(bids);
  } catch (error) {
    console.error('Error fetching user bids:', error);
    res.status(500).json({ 
      message: 'Error fetching user bids',
      error: error.message 
    });
  }
};
