const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get all users
router.get('/users', userController.getAllUsers);

// Get a user by ID
router.get('/user/:id', userController.getUserById);

// Create a new user
router.post('/user', userController.createUser);

// Update a user by ID
router.put('/user/:id', userController.updateUser);

// Delete a user by ID
router.delete('/user/:id', userController.deleteUser);

module.exports = router;
