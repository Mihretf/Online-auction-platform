<<<<<<< HEAD
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
=======
>>>>>>> 142e4870217515e54b80e8285df7168206c5cb4f

// server.js

// 1. Load environment variables
const dotenv = require('dotenv');
dotenv.config(); // Reads .env file

// 2. Import dependencies
const express = require('express');
const connectDB = require('./config/db'); // Your db.js file
const itemRoutes = require('./routes/itemRoutes'); // Item API routes
const auctionRoutes = require('./routes/auctionRoutes'); // Auction API routes

// 3. Initialize Express app
const app = express();
<<<<<<< HEAD
app.use(cors());
=======

// 4. Middleware to parse JSON request bodies
>>>>>>> 142e4870217515e54b80e8285df7168206c5cb4f
app.use(express.json());

// 5. Optional: simple request logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

<<<<<<< HEAD
// Routes
app.use("/api/bids", require("./routes/bidRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/auctions", require("./routes/auctionRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/test", require("./routes/testRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("[Error]", err);
  res.status(err.status || 500).json({
    error: err.name || "ServerError",
    message: err.message || "Unexpected error"
  });
=======
// 6. Connect to MongoDB Atlas
connectDB(); // logs success or exits if fails
// 7. Mount API routes
app.use('/api/items', itemRoutes);      // All item routes prefixed with /api/items
app.use('/api/auctions', auctionRoutes); // All auction routes prefixed with /api/auctions
app.use("/api/auth", require("./routes/authRoutes"));
// Example: attach bids route
app.use("/api/bids", require("./routes/bidRoutes"));
// 8. Default test route to check if server is running
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Auction API is running...' });
>>>>>>> 142e4870217515e54b80e8285df7168206c5cb4f
});

// 9. Global error handler
// Catches any errors thrown in routes/controllers
app.use((err, req, res, next) => {
    console.error('Error stack:', err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Something went wrong!',
        error: process.env.NODE_ENV === 'production' ? {} : err.stack
    });
});

// 10. Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

