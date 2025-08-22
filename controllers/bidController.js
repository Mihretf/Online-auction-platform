const mongoose = require("mongoose");
const Bid = require("../models/bidModel");
const Auction = require("../models/auctionModel");
const Item = require("../models/itemModel");
const { sendOutbidNotification } = require("../services/notifications");

const INCREMENT = Number(process.env.BID_INCREMENT || 1);

// helper: get current highest bid
async function getHighestBid(auctionId) {
  return Bid.findOne({ auctionId }).sort({ amount: -1, createdAt: 1 });
}

// helper: accept a new bid & update auction price
async function placeAcceptedBid({ auctionId, bidderId, amount, type, maxBid }) {
  const bid = await Bid.create({ auctionId, bidderId, amount, type, maxBid, status: "accepted" });
  await Auction.findByIdAndUpdate(auctionId, { finalPrice: amount });
  return bid;
}

// helper: resolve proxy vs proxy clash
function computeProxyClash(aMax, bMax, aIsExisting) {
  if (aMax === bMax) {
    return { winner: aIsExisting ? "A" : "B", clearingPrice: aMax };
  }
  const winner = aMax > bMax ? "A" : "B";
  const high = Math.max(aMax, bMax);
  const low = Math.min(aMax, bMax);
  const clearingPrice = Math.min(high, low + INCREMENT);
  return { winner, clearingPrice };
}

exports.placeBid = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { itemId, amount, maxAutoBid } = req.body;
    const userId = req.user?.id;

    if (!itemId) return res.status(400).json({ error: "Bad Request", message: "itemId is required" });

    // find a live auction for the item
    const auction = await Auction.findOne({ itemId, status: "live" }).session(session);
    if (!auction) {
      await session.abortTransaction();
      return res.status(400).json({ error: "Bad Request", message: "Auction not live for this item" });
    }

    if (!req.user?.verified) {
      await session.abortTransaction();
      return res.status(403).json({ error: "Forbidden", message: "User not verified" });
    }

    const highest = await Bid.findOne({ auctionId: auction._id })
      .sort({ amount: -1, createdAt: 1 })
      .session(session);

    // ---------- MANUAL BID ----------
    if (!maxAutoBid) {
      if (typeof amount !== "number") {
        await session.abortTransaction();
        return res.status(400).json({ error: "Bad Request", message: "amount is required for manual bids" });
      }
      if (highest && amount <= highest.amount) {
        await session.abortTransaction();
        return res.status(400).json({ error: "Bad Request", message: "Bid must be higher than current bid" });
      }

      const manual = await placeAcceptedBid({
        auctionId: auction._id,
        bidderId: userId,
        amount,
        type: "manual"
      });

      // if a proxy already exists, it may outbid immediately
      if (highest && highest.type === "proxy" && highest.maxBid >= amount + INCREMENT) {
        const autoAmount = Math.min(highest.maxBid, amount + INCREMENT);
        const autobid = await placeAcceptedBid({
          auctionId: auction._id,
          bidderId: highest.bidderId,
          amount: autoAmount,
          type: "proxy",
          maxBid: highest.maxBid
        });
        sendOutbidNotification({ userId: userId, itemId });
        await session.commitTransaction();
        return res.status(201).json({
          message: "Bid placed, but immediately outbid by proxy",
          yourBidId: manual._id,
          outbidBy: autobid._id,
          status: "outbid"
        });
      }

      await session.commitTransaction();
      return res.status(201).json({ message: "Bid placed successfully", bidId: manual._id, status: "accepted" });
    }

    // ---------- PROXY BID ----------
    if (typeof maxAutoBid !== "number") {
      await session.abortTransaction();
      return res.status(400).json({ error: "Bad Request", message: "maxAutoBid must be a number" });
    }

    const item = await Item.findById(itemId).session(session);
    if (!item) {
      await session.abortTransaction();
      return res.status(400).json({ error: "Bad Request", message: "Item not found" });
    }

    const startAmount = highest ? highest.amount + INCREMENT : item.startingPrice;
    if (startAmount > maxAutoBid) {
      await session.abortTransaction();
      return res.status(400).json({ error: "Bad Request", message: "maxAutoBid is below the minimum next bid" });
    }

    // if no proxy exists yet
    if (!highest || highest.type === "manual") {
      const proxyBid = await placeAcceptedBid({
        auctionId: auction._id,
        bidderId: userId,
        amount: startAmount,
        type: "proxy",
        maxBid: maxAutoBid
      });
      await session.commitTransaction();
      return res.status(201).json({ message: "Proxy bid placed", bidId: proxyBid._id, status: "accepted" });
    }

    // proxy vs proxy battle
    if (highest.type === "proxy") {
      const { winner, clearingPrice } = computeProxyClash(highest.maxBid, maxAutoBid, true);
      if (winner === "A") {
        if (clearingPrice > highest.amount) {
          await placeAcceptedBid({
            auctionId: auction._id,
            bidderId: highest.bidderId,
            amount: clearingPrice,
            type: "proxy",
            maxBid: highest.maxBid
          });
        }
        await Bid.create({
          auctionId: auction._id,
          bidderId: userId,
          amount: startAmount,
          type: "proxy",
          maxBid: maxAutoBid,
          status: "rejected"
        });
        sendOutbidNotification({ userId, itemId });
        await session.commitTransaction();
        return res.status(201).json({ message: "Proxy entered but was outmatched by existing proxy", status: "outbid" });
      } else {
        const loserMax = highest.maxBid;
        if (clearingPrice > highest.amount) {
          await placeAcceptedBid({
            auctionId: auction._id,
            bidderId: highest.bidderId,
            amount: Math.min(loserMax, startAmount),
            type: "proxy",
            maxBid: loserMax
          });
        }
        const winningBid = await placeAcceptedBid({
          auctionId: auction._id,
          bidderId: userId,
          amount: clearingPrice,
          type: "proxy",
          maxBid: maxAutoBid
        });
        await session.commitTransaction();
        return res.status(201).json({ message: "Proxy bid placed and is now highest", bidId: winningBid._id, status: "accepted" });
      }
    }

    await session.commitTransaction();
    return res.status(201).json({ message: "Bid processed" });
  } catch (err) {
    await session.abortTransaction();
    console.error("[placeBid]", err);
    return res.status(500).json({ error: "Server Error", message: err.message });
  } finally {
    session.endSession();
  }
};

exports.getHighestForItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const auction = await Auction.findOne({ itemId, status: "live" });
    if (!auction) return res.status(404).json({ error: "Not Found", message: "Live auction not found" });
    const highest = await getHighestBid(auction._id);
    return res.json({ auctionId: auction._id, highest });
  } catch (err) {
    return res.status(500).json({ error: "Server Error", message: err.message });
  }
};
