const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: String,
    category: String,
    startingPrice: { type: Number, required: true },
    reservePrice: Number,
    status: { type: String, enum: ["draft", "published", "closed"], default: "published" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
