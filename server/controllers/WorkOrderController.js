// controllers/WorkOrderController.js
const WorkOrder = require('../models/WorkOrderModel');
const authenticateUser = require('../middlewares/authenticationMiddleware');
const authorizeUser = require('../middlewares/authorizationMiddleware');

// Create a new work order
const createWorkOrder = async (req, res) => {
  try {
    const workOrder = new WorkOrder(req.body);
    await workOrder.save();
    res.status(201).send(workOrder);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all work orders
const getAllWorkOrders = async (req, res) => {
  try {
    const workOrders = await WorkOrder.find();
    res.send(workOrders);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get work order by ID
const getWorkOrderById = async (req, res) => {
  const _id = req.params.id;

  try {
    const workOrder = await WorkOrder.findById(_id);

    if (!workOrder) {
      return res.status(404).send();
    }

    res.send(workOrder);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update work order by ID
const updateWorkOrderById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['assetId', 'technicianId', 'description', 'scheduledMaintenance', 'status'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  const _id = req.params.id;

  try {
    const workOrder = await WorkOrder.findById(_id);

    if (!workOrder) {
      return res.status(404).send();
    }

    updates.forEach((update) => (workOrder[update] = req.body[update]));
    await workOrder.save();

    res.send(workOrder);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete work order by ID
const deleteWorkOrderById = async (req, res) => {
  const _id = req.params.id;

  try {
    const workOrder = await WorkOrder.findByIdAndDelete(_id);

    if (!workOrder) {
      return res.status(404).send();
    }

    res.send(workOrder);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createWorkOrder,
  getAllWorkOrders,
  getWorkOrderById,
  updateWorkOrderById,
  deleteWorkOrderById,
};
