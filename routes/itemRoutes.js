const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middleware/auth');

// Create a new item
// router.post('/', authMiddleware, itemController.createItem);
router.post('/', async (req, res) => {
    try {
        // for testing, manually provide a sellerId from your users collection
        const newItem = await itemController.createItem(req.body);
        res.status(201).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Get all items
router.get('/', authMiddleware, itemController.getAllItems);

// Get single item by ID
router.get('/:id', authMiddleware, itemController.getItemById);

// Update item
router.patch('/:id', authMiddleware, itemController.updateItem);

// Delete item
router.delete('/:id', authMiddleware,  itemController.deleteItem);


module.exports = router;
