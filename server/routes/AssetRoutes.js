const express = require('express');
const AssetController = require('../controllers/AssetController');
const authenticateUser = require('../middlewares/authenticationMiddleware');
const authorizeUser = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.post('/assets', authenticateUser, authorizeUser('Manager'), AssetController.createAsset);
router.get('/assets', authenticateUser, authorizeUser('Technician'), AssetController.getAllAssets);
router.get('/assets/:id', authenticateUser, authorizeUser('Technician'), AssetController.getAssetById);
router.patch('/assets/:id', authenticateUser, authorizeUser('Manager'), AssetController.updateAssetById);
router.delete('/assets/:id', authenticateUser, authorizeUser('Manager'), AssetController.deleteAssetById);

module.exports = router;
