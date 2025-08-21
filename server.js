// server.js

// 1. Load environment variables
const dotenv = require('dotenv');
dotenv.config(); // Reads .env file

// 2. Import dependencies
const express = require('express');
const cors = require('cors'); // import cors after dotenv
const connectDB = require('./config/db'); // Your db.js file
const itemRoutes = require('./routes/itemRoutes'); // Item API routes
const auctionRoutes = require('./routes/auctionRoutes'); // Auction API routes
const notificationsRoute = require('./routes/notifications');  // chore
const adminAuditRoute = require('./routes/adminAudit');        // chore
const usersRoute = require('./routes/users');   // import

// 3. Initialize Express app
const app = express();

// 4. Middleware to enable CORS
app.use(cors());                           // chore: enable CORS for dev

// 5. Middleware to parse JSON request bodies
app.use(express.json());

// 6. Optional: simple request logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// 7. Connect to MongoDB Atlas
connectDB(); // logs success or exits if fails

// 8. Mount API routes
app.use('/api/items', itemRoutes);      // All item routes prefixed with /api/items
app.use('/api/auctions', auctionRoutes); // All auction routes prefixed with /api/auctions
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bids", require("./routes/bidRoutes"));
app.use('/api/notifications', notificationsRoute);
app.use('/api/admin/audit', adminAuditRoute);
app.use('/api/users', usersRoute);

// 9. Default test route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Auction API is running...' });
});

// 10. Global error handler
app.use((err, req, res, next) => {
    console.error('Error stack:', err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Something went wrong!',
        error: process.env.NODE_ENV === 'production' ? {} : err.stack
    });
});

// 11. Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
