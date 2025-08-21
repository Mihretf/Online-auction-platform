const mongoose = require('mongoose');            // chore: import mongoose
const { genId } = require('../utils/id');        // chore: import ID helper

const notificationSchema = new mongoose.Schema({
  // feat: fixed external ID per API spec
  notificationId: { type: String, default: () => genId('NTF'), unique: true },

  // feat: domain fields
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  type: { type: String, enum: ['bid_outbid', 'auction_reminder', 'approval'], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },  // feat: ISO timestamp
  read: { type: Boolean, default: false },       // feat: unread by default
}, { versionKey: false });

// feat: control API output (remove _id)
notificationSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret._id;
    return ret;
  }
});

// perf: index common filters
notificationSchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
