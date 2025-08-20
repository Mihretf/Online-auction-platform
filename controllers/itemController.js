const itemService = require('../services/itemService'); // Import Item service functions
const Item = require("../models/itemsModel")
// Controller to create a new item
async function createItem(req, res) {
    const sellerId = req.user.id; // Get seller ID from authenticated user
    itemService.createItem(req.body, sellerId) // Call service to create item
        .then(newItem => res.status(201).json(newItem)) // Return created item with 201 status
        .catch(error => res.status(400).json({ message: error.message })); // Handle errors
}

// async function createItem(itemData, sellerId) {
//   // Use dummy ID if sellerId isn’t provided (since auth not ready yet)
//   const dummySellerId = sellerId || "000000000000000000000000"; // valid 24-char ObjectId
//   const newItem = await Item.create({ ...itemData, sellerId: dummySellerId });
//   return newItem;
// }


// Controller to get all items
async function getAllItems(req, res) {
    itemService.getAllItems(req.query) // Pass query parameters for filtering
        .then(items => res.json(items)) // Return list of items
        .catch(error => res.status(400).json({ message: error.message })); // Handle errors
}

// Controller to get a single item by ID
async function getItemById(req, res) {
    itemService.getItemById(req.params.id) // Use item ID from URL params
        .then(item => res.json(item)) // Return item with auction info
        .catch(error => res.status(404).json({ message: error.message })); // 404 if not found
}

// Controller to update an item
async function updateItem(req, res) {
    itemService.updateItem(req.params.id, req.user.id, req.body) // Pass item ID, seller ID, and update data
        .then(updatedItem => res.json(updatedItem)) // Return updated item
        .catch(error => res.status(400).json({ message: error.message })); // Handle errors
}

// Controller to delete an item
async function deleteItem(req, res) {
    itemService.deleteItem(req.params.id, req.user) // Pass item ID and user info
        .then(result => res.json(result)) // Return deletion confirmation
        .catch(error => res.status(400).json({ message: error.message })); // Handle errors
}

// Export all controllers at the bottom
module.exports = {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem
};
