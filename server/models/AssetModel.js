const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  purchaseDate: { type: Date },
  maintenanceHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MaintenanceLogModel' }],
  currentCondition: { type: String },
  assignedTechnician: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
