const Inventory = require('../models/InventoryModel');
const authenticateUser = require('../middlewares/authenticationMiddleware');
const authorizeUser = require('../middlewares/authorizationMiddleware');

// Create a new inventory item
const createInventoryItem = async (req, res) => {
  try {
    const inventoryItem = new Inventory(req.body);
    await inventoryItem.save();
    res.status(201).send(inventoryItem);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all inventory items
const getAllInventoryItems = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find();
    res.send(inventoryItems);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get inventory item by ID
const getInventoryItemById = async (req, res) => {
  const _id = req.params.id;

  try {
    const inventoryItem = await Inventory.findById(_id);

    if (!inventoryItem) {
      return res.status(404).send();
    }

    res.send(inventoryItem);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update inventory item by ID
const updateInventoryItemById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['itemName', 'description', 'quantity', 'unitOfMeasure', 'minimumStockLevel', 'supplierInformation'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  const _id = req.params.id;

  try {
    const inventoryItem = await Inventory.findById(_id);

    if (!inventoryItem) {
      return res.status(404).send();
    }

    updates.forEach((update) => (inventoryItem[update] = req.body[update]));
    await inventoryItem.save();

    res.send(inventoryItem);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete inventory item by ID
const deleteInventoryItemById = async (req, res) => {
  const _id = req.params.id;

  try {
    const inventoryItem = await Inventory.findByIdAndDelete(_id);

    if (!inventoryItem) {
      return res.status(404).send();
    }

    res.send(inventoryItem);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
  updateInventoryItemById,
  deleteInventoryItemById,
};
