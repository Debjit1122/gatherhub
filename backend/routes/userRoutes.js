const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST request to register a user
router.post('/register', userController.registerUser);

// POST request to login a user
router.post('/login', userController.loginUser);

module.exports = router;
