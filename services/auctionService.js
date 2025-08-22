const Auction = require('../models/AuctionsModel');
const Item = require('../models/itemsModel');
const Bid = require('../models/bidModel');

// Create a new auction
async function createAuction(auctionData) {
    const item = await Item.findById(auctionData.itemId);
    if (!item) throw new Error('Item not found');

    if (item.status !== 'approved') throw new Error('Item not approved');

    if (!auctionData.startTime || !auctionData.endTime) {
        throw new Error('Auction must have startTime and endTime');
    }

    if (new Date(auctionData.startTime) >= new Date(auctionData.endTime)) {
        throw new Error('startTime must be before endTime');
    }

    const newAuction = await Auction.create({
        itemId: auctionData.itemId,
        startTime: new Date(auctionData.startTime),
        endTime: new Date(auctionData.endTime),
        status: new Date() >= new Date(auctionData.startTime) ? 'ongoing' : 'scheduled'
    });

    return newAuction;
}

// Get all ongoing and scheduled auctions
async function getAllAuctions() {
    const auctions = await Auction.find({
        status: { $in: ['ongoing', 'scheduled'] }
    }).populate('itemId');
    return auctions;
}

// Get a single auction by ID with highest bid info and winnerId if completed
async function getAuctionById(id) {
    const auction = await Auction.findById(id).populate('itemId');
    if (!auction) throw new Error('Auction not found');

    // Get top bid if any
    const topBid = await Bid.findOne({ auctionId: id }).sort({ amount: -1 }).populate('bidderId');

    const highestBid = topBid ? topBid.amount : auction.finalPrice || 0;
    const winnerId = auction.status === 'completed' && topBid ? topBid.bidderId._id : null;

    return { ...auction.toObject(), highestBid, winnerId };
}

// Update auction details
async function updateAuction(id, updateData) {
    const auction = await Auction.findById(id);
    if (!auction) throw new Error('Auction not found');

    Object.assign(auction, updateData);
    await auction.save();

    // If auction is completed, automatically update finalPrice & winnerId
    if (auction.status === 'completed') {
        const topBid = await Bid.findOne({ auctionId: id }).sort({ amount: -1 });
        if (topBid) {
            auction.finalPrice = topBid.amount;
            auction.winnerId = topBid.bidderId;
            await auction.save();
        }
    }

    return auction;
}

// Delete an auction
async function deleteAuction(id) {
    const auction = await Auction.findById(id);
    if (!auction) throw new Error('Auction not found');

    await Auction.deleteOne({ _id: id });
    return { message: 'Auction deleted' };
}

module.exports = {
    createAuction,
    getAllAuctions,
    getAuctionById,
    updateAuction,
    deleteAuction
};
