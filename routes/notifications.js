const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { genId } = require('../utils/id');

// GET /api/notifications (already exists)
router.get('/', async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'userId required' });

  const notifications = await Notification.find({ userId }).sort({ timestamp: -1 });
  res.status(200).json(notifications.map(n => ({
    notificationId: n.notificationId,
    type: n.type,
    message: n.message,
    timestamp: n.timestamp,
    read: n.read
  })));
});

// ✅ NEW: POST /api/notifications
router.post('/', async (req, res) => {
  const { userId, type, message } = req.body;
  if (!userId || !type || !message) {
    return res.status(400).json({ error: 'userId, type, and message are required' });
  }

  try {
    const notification = await Notification.create({
      notificationId: genId('NTF'),
      userId,
      type,
      message,
      timestamp: new Date(),
      read: false
    });

    res.status(201).json({
      notificationId: notification.notificationId,
      type: notification.type,
      message: notification.message,
      timestamp: notification.timestamp,
      read: notification.read
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create notification' });
  }
});

module.exports = router;
