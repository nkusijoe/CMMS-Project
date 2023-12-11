const express = require('express');
const WorkOrderController = require('../controllers/WorkOrderController');
const authenticateUser = require('../middlewares/authenticationMiddleware');
const authorizeUser = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.post('/workOrders', authenticateUser, WorkOrderController.createWorkOrder);
router.get('/workOrders', authenticateUser, WorkOrderController.getAllWorkOrders);
router.get('/workOrders/:id', authenticateUser, WorkOrderController.getWorkOrderById);
router.patch('/workOrders/:id', authenticateUser, WorkOrderController.updateWorkOrderById);
router.delete('/workOrders/:id', authenticateUser, WorkOrderController.deleteWorkOrderById);

module.exports = router;
