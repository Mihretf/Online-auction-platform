
const itemService = require('../services/itemService');

// Create a new item
async function createItem(req, res) {
    try {
        const sellerId = req.user.id; // Authenticated user ID
        const newItem = await itemService.createItem(req.body, sellerId);
        res.status(201).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get all items
async function getAllItems(req, res) {
    try {
        const items = await itemService.getAllItems(req.query); // Optional query filters
        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Get single item by ID
async function getItemById(req, res) {
    try {
        const item = await itemService.getItemById(req.params.id);
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Update an item
async function updateItem(req, res) {
    try {
        const updatedItem = await itemService.updateItem(req.params.id, req.user.id, req.body);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete an item
async function deleteItem(req, res) {
    try {
        const result = await itemService.deleteItem(req.params.id, req.user);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Export all controllers
module.exports = {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem
};
