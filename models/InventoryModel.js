const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, default: 0 },
  unitOfMeasure: { type: String },
  minimumStockLevel: { type: Number },
  supplierInformation: { type: String },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
