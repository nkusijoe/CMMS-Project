const mongoose = require('mongoose');

const maintenanceLogSchema = new mongoose.Schema({
  workOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkOrder', required: true },
  technician: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  logDetails: { type: String },
  partsUsed: [{ type: String }],
  duration: { type: Number }, // in minutes
});

const MaintenanceLog = mongoose.model('MaintenanceLog', maintenanceLogSchema);

module.exports = MaintenanceLog;
