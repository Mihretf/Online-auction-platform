const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { authMiddleware , isAdmin} = require('../middleware/authMiddleware'); // correct import
const {approveItem} = require('../controllers/adminController')

// Create a new item
router.post('/', authMiddleware, itemController.createItem);

// Get all items
router.get('/', authMiddleware, itemController.getAllItems);

// Get single item by ID
router.get('/:id', authMiddleware, itemController.getItemById);

// Update item
router.patch('/:id', authMiddleware, itemController.updateItem);

// Admin only: approve/reject item
router.patch('/:id/approve', authMiddleware, isAdmin, approveItem);


// Delete item
router.delete('/:id', authMiddleware, itemController.deleteItem);

module.exports = router;
