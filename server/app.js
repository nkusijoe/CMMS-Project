const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const userRoutes = require('./routes/UserRoutes');
const assetRoutes = require('./routes/AssetRoutes');
const inventoryRoutes = require('./routes/InventoryRoutes');
const maintenanceLogRoutes = require('./routes/MaintenanceLogRoutes');
const workOrderRoutes = require('./routes/WorkOrderRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Routes
app.use(userRoutes);
app.use(assetRoutes);
app.use(inventoryRoutes);
app.use(maintenanceLogRoutes);
app.use(workOrderRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
