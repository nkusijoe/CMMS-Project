const MaintenanceLog = require('../models/MaintenanceLogModel');
const authenticateUser = require('../middlewares/authenticationMiddleware');
const authorizeUser = require('../middlewares/authorizationMiddleware');

// Create a new maintenance log entry
const createMaintenanceLog = async (req, res) => {
  try {
    const maintenanceLog = new MaintenanceLog(req.body);
    await maintenanceLog.save();
    res.status(201).send(maintenanceLog);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all maintenance log entries
const getAllMaintenanceLogs = async (req, res) => {
  try {
    const maintenanceLogs = await MaintenanceLog.find();
    res.send(maintenanceLogs);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get maintenance log entry by ID
const getMaintenanceLogById = async (req, res) => {
  const _id = req.params.id;

  try {
    const maintenanceLog = await MaintenanceLog.findById(_id);

    if (!maintenanceLog) {
      return res.status(404).send();
    }

    res.send(maintenanceLog);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update maintenance log entry by ID
const updateMaintenanceLogById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['assetId', 'technicianId', 'maintenanceType', 'description', 'date', 'status'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  const _id = req.params.id;

  try {
    const maintenanceLog = await MaintenanceLog.findById(_id);

    if (!maintenanceLog) {
      return res.status(404).send();
    }

    updates.forEach((update) => (maintenanceLog[update] = req.body[update]));
    await maintenanceLog.save();

    res.send(maintenanceLog);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete maintenance log entry by ID
const deleteMaintenanceLogById = async (req, res) => {
  const _id = req.params.id;

  try {
    const maintenanceLog = await MaintenanceLog.findByIdAndDelete(_id);

    if (!maintenanceLog) {
      return res.status(404).send();
    }

    res.send(maintenanceLog);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createMaintenanceLog,
  getAllMaintenanceLogs,
  getMaintenanceLogById,
  updateMaintenanceLogById,
  deleteMaintenanceLogById,
};
