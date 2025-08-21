// const Bid = require('../models/Bid'); // Assuming you have a Bid model
// const Auction = require('../models/Auction'); // Assuming you have an Auction model

// // Create a new bid
// exports.createBid = async (req, res) => {
//   try {
//     const { auctionId, amount } = req.body;

//     // Find the auction
//     const auction = await Auction.findById(auctionId);
//     if (!auction) {
//       return res.status(404).json({ message: 'Auction not found' });
//     }

//     // Create a new bid
//     const newBid = new Bid({
//       auction: auctionId,
//       amount,
//       user: req.user.id // Assuming user ID is available in req.user
//     });

//     await newBid.save();
//     res.status(201).json(newBid);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all bids for an auction
// exports.getBidsForAuction = async (req, res) => {
//   try {
//     const { auctionId } = req.params;
//     const bids = await Bid.find({ auction: auctionId }).populate('user', 'username'); // Assuming user has a username field
//     res.status(200).json(bids);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a bid
// exports.deleteBid = async (req, res) => {
//   try {
//     const { bidId } = req.params;
//     const bid = await Bid.findByIdAndDelete(bidId);
//     if (!bid) {
//       return res.status(404).json({ message: 'Bid not found' });
//     }
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };