const mongoose = require('mongoose');        // chore
const { genId } = require('../utils/id');    // chore

const auditLogSchema = new mongoose.Schema({
  // feat: fixed external ID per API spec
  actionId: { type: String, default: () => genId('ACT'), unique: true },

  // feat: domain fields
  actor: { type: String, required: true },       // e.g., "admin"
  action: { type: String, required: true },      // e.g., "Approved item ITM-2001"
  timestamp: { type: Date, default: Date.now }   // ISO timestamp
}, { versionKey: false });

auditLogSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret._id;
    return ret;
  }
});

// perf: index for admin list views
auditLogSchema.index({ timestamp: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
