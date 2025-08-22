const axios = require("axios");

async function sendOutbidNotification({ userId, itemId }) {
  if (!process.env.NOTIFICATIONS_URL) return;
  try {
    await axios.post(process.env.NOTIFICATIONS_URL, {
      userId,
      type: "bid_outbid",
      message: `You were outbid on item ${itemId}`
    });
  } catch (err) {
    console.warn("[notify] failed:", err.message);
  }
}

module.exports = { sendOutbidNotification };
