const mongoose = require('mongoose');

const workOrderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  asset: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  assignedTechnicians: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  startDate: { type: Date },
  dueDate: { type: Date },
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const WorkOrder = mongoose.model('WorkOrder', workOrderSchema);

module.exports = WorkOrder;
