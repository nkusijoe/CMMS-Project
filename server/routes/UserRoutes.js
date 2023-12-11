const express = require('express');
const UserController = require('../controllers/UserController');
const authenticateUser = require('../middlewares/authenticationMiddleware');
const authorizeUser = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.post('/users', UserController.createUser);
router.post('/users/login', UserController.loginUser);
router.get('/users/me', authenticateUser, UserController.getUserProfile);
router.patch('/users/me', authenticateUser, UserController.updateUserProfile);
router.delete('/users/me', authenticateUser, UserController.deleteUserProfile);
router.post('/users/logout', authenticateUser, UserController.logoutUser);
router.post('/users/logoutAll', authenticateUser, UserController.logoutAllSessions);
router.get('/example/manager-only', authenticateUser, authorizeUser('Manager'), UserController.managerOnlyExample);

module.exports = router;
