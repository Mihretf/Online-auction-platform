const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // will look for config/db.js

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("✅ Auction API is running...");
});

// Example: attach bids route
app.use("/api/bids", require("./routes/bidRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
