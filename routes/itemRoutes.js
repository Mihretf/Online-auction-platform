const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const {authMiddleware} = require('../middleware/authMiddleware');

// All item routes are protected by authentication
router.use(authMiddleware);

// Create a new item
router.post('/', itemController.createItem);

// Get all items
router.get('/', itemController.getAllItems);

// Get a single item by ID
router.get('/:id', itemController.getItemById);

// Update an item
router.patch('/:id', itemController.updateItem);

// Delete an item
router.delete('/:id', itemController.deleteItem);

module.exports = router;
