const express = require('express');
const MaintenanceLogController = require('../controllers/MaintenanceLogController');
const authenticateUser = require('../middlewares/authenticationMiddleware');
const authorizeUser = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.post('/maintenanceLogs', authenticateUser, MaintenanceLogController.createMaintenanceLog);
router.get('/maintenanceLogs', authenticateUser, MaintenanceLogController.getAllMaintenanceLogs);
router.get('/maintenanceLogs/:id', authenticateUser, MaintenanceLogController.getMaintenanceLogById);
router.patch('/maintenanceLogs/:id', authenticateUser, MaintenanceLogController.updateMaintenanceLogById);
router.delete('/maintenanceLogs/:id', authenticateUser, MaintenanceLogController.deleteMaintenanceLogById);

module.exports = router;
