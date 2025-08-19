// config/db.js
const mongoose = require('mongoose');
let memoryServer = null;

async function connectDB() {
    const envUri = process.env.MONGO_URI;
    const useMemory = process.env.USE_IN_MEMORY_DB === 'true' || !envUri;
    let mongoURI = envUri;
    try {
        if (useMemory) {
            const { MongoMemoryServer } = require('mongodb-memory-server');
            memoryServer = await MongoMemoryServer.create();
            mongoURI = memoryServer.getUri('auctionDB');
            console.log('Using in-memory MongoDB instance');
        } else if (!mongoURI) {
            mongoURI = "mongodb+srv://AuctionDB:AuctionDB@cluster0.guqozay.mongodb.net/auctionDB?retryWrites=true&w=majority";
        }

        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        if (memoryServer) {
            try { await memoryServer.stop(); } catch (_) { /* noop */ }
        }
        // Do not exit; allow server to run for non-DB routes
    }
}

module.exports = connectDB;
