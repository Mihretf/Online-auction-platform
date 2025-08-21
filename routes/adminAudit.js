const express = require('express');
const router = express.Router();                // chore
const AuditLog = require('../models/AuditLog');
const { isAdmin } = require('../middleware/auth');

// GET /api/admin/audit (Admin Only)
// desc: List all recorded system actions
// query: page, limit (optional)
router.get('/', isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const logs = await AuditLog.find({})
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const payload = logs.map(l => ({
      actionId: l.actionId,
      actor: l.actor,
      action: l.action,
      timestamp: l.timestamp
    }));

    return res.status(200).json(payload);      // ✅ matches your successful response shape
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

module.exports = router;                       // chore
