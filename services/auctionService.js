const Auction = require('../models/AuctionsModel');
const Item = require('../models/itemsModel');

// Create a new auction
async function createAuction(auctionData) {
    const item = await Item.findById(auctionData.itemId);
    if (!item) throw new Error('Item not found');
    if (item.status !== 'approved') throw new Error('Item not approved');
    const newAuction = await Auction.create({ ...auctionData });
    return newAuction;
}

// Get all ongoing and upcoming auctions
async function getAllAuctions() {
    const auctions = await Auction.find({ status: { $in: ['ongoing', 'scheduled'] } });
    return auctions;
}

// Get a single auction by ID with current bids and highest bid
async function getAuctionById(id) {
    const auction = await Auction.findById(id);
    if (!auction) throw new Error('Auction not found');
    const highestBid = auction.status === 'completed' && auction.finalPrice ? auction.finalPrice : 0;
    return { ...auction.toObject(), highestBid };
}

// Update auction details (status, start/end time)
async function updateAuction(id, updateData) {
    const auction = await Auction.findById(id); // Fetch auction
    if (!auction) throw new Error('Auction not found');

    // Apply updates
    Object.assign(auction, updateData);
    await auction.save(); // Save updated auction
    return auction;
}

// Delete an auction (admin only)
async function deleteAuction(id) {
    const auction = await Auction.findById(id);
    if (!auction) throw new Error('Auction not found');
    await Auction.deleteOne({ _id: id });
    return { message: 'Auction deleted' };
}

// Export all auction service functions
module.exports = {
    createAuction,
    getAllAuctions,
    getAuctionById,
    updateAuction,
    deleteAuction
};
