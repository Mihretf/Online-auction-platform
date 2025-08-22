const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema(
  {
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: { type: String, enum: ["scheduled", "live", "closed"], default: "scheduled" },
    winnerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    finalPrice: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auction", auctionSchema);
