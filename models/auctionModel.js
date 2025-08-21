// const mongoose = require('mongoose');

// const auctionSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   startingBid: {
//     type: Number,
//     required: true,
//   },
//   currentBid: {
//     type: Number,
//     default: 0,
//   },
//   endTime: {
//     type: Date,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   seller: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   bidders: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   }],
// });

// const Auction = mongoose.model('Auction', auctionSchema);

// module.exports = Auction;
