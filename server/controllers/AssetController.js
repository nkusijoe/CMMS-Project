const Asset = require('../models/AssetModel');
const authenticateUser = require('../middlewares/authenticationMiddleware');
const authorizeUser = require('../middlewares/authorizationMiddleware');

// Create a new asset
const createAsset = async (req, res) => {
  try {
    const asset = new Asset(req.body);
    await asset.save();
    res.status(201).send(asset);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all assets
const getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.send(assets);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get asset by ID
const getAssetById = async (req, res) => {
  const _id = req.params.id;

  try {
    const asset = await Asset.findById(_id);

    if (!asset) {
      return res.status(404).send();
    }

    res.send(asset);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update asset by ID
const updateAssetById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'description', 'location', 'currentCondition', 'assignedTechnician'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  const _id = req.params.id;

  try {
    const asset = await Asset.findById(_id);

    if (!asset) {
      return res.status(404).send();
    }

    updates.forEach((update) => (asset[update] = req.body[update]));
    await asset.save();

    res.send(asset);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete asset by ID
const deleteAssetById = async (req, res) => {
  const _id = req.params.id;

  try {
    const asset = await Asset.findByIdAndDelete(_id);

    if (!asset) {
      return res.status(404).send();
    }

    res.send(asset);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createAsset,
  getAllAssets,
  getAssetById,
  updateAssetById,
  deleteAssetById,
};