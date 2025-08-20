const auctionService = require('../services/auctionService'); // Import auction service

// Controller to create a new auction
function createAuction(req, res) {
    auctionService.createAuction(req.body) // Pass auction data from request body
        .then(auction => res.status(201).json(auction)) // Return created auction
        .catch(error => res.status(400).json({ message: error.message })); // Handle errors
}

// Controller to get all auctions
function getAllAuctions(req, res) {
    auctionService.getAllAuctions() // Fetch ongoing and upcoming auctions
        .then(auctions => res.json(auctions)) // Return list
        .catch(error => res.status(400).json({ message: error.message }));
}

// Controller to get single auction by ID
function getAuctionById(req, res) {
    auctionService.getAuctionById(req.params.id) // Fetch auction by ID
        .then(auction => res.json(auction)) // Return auction with highest bid
        .catch(error => res.status(404).json({ message: error.message })); // 404 if not found
}

// Controller to update auction
function updateAuction(req, res) {
    auctionService.updateAuction(req.params.id, req.body) // Pass update data
        .then(updated => res.json(updated)) // Return updated auction
        .catch(error => res.status(400).json({ message: error.message }));
}

// Controller to delete auction
function deleteAuction(req, res) {
    auctionService.deleteAuction(req.params.id) // Delete auction by ID
        .then(result => res.json(result)) // Return confirmation
        .catch(error => res.status(400).json({ message: error.message }));
}

// Export all auction controllers
module.exports = {
    createAuction,
    getAllAuctions,
    getAuctionById,
    updateAuction,
    deleteAuction
};
