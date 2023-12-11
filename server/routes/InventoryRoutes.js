const express = require('express');
const InventoryController = require('../controllers/InventoryController');
const authenticateUser = require('../middlewares/authenticationMiddleware');
const authorizeUser = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.post('/inventory', authenticateUser, authorizeUser('Manager'), InventoryController.createInventoryItem);
router.get('/inventory', authenticateUser, authorizeUser('Technician'), InventoryController.getAllInventoryItems);
router.get('/inventory/:id', authenticateUser, authorizeUser('Technician'), InventoryController.getInventoryItemById);
router.patch('/inventory/:id', authenticateUser, authorizeUser('Manager'), InventoryController.updateInventoryItemById);
router.delete('/inventory/:id', authenticateUser, authorizeUser('Manager'), InventoryController.deleteInventoryItemById);

module.exports = router;
