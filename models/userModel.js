const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["bidder", "seller", "admin"], required: true },
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, required: true },
    passwordHash: String,
    phone: String,
    bankStatementUrl: String,
    verified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
