const Item = require('../models/itemsModel');

const approveItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Set status to approved or rejected
    item.status = req.body.status; // "approved" or "rejected"
    await item.save();

    res.status(200).json({ message: 'Item approved successfully', item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { approveItem };
