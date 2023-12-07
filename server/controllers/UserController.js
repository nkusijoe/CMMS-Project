const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateUser = require('../middlewares/authenticationMiddleware');
const authorizeUser = require('../middlewares/authorizationMiddleware');

// Create a new user
const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(401).send({ error: 'Invalid login credentials.' });
  }
};

// Get user profile
const getUserProfile = (req, res) => {
  res.send(req.user);
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['username', 'email', 'password'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete user profile
const deleteUserProfile = async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Logout user
const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

// Logout all sessions
const logoutAllSessions = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

// Example route that requires 'Manager' role
const managerOnlyExample = (req, res) => {
  res.send({ message: 'This route is accessible only to Managers.' });
};

module.exports = {
  createUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  logoutUser,
  logoutAllSessions,
  managerOnlyExample,
};
