const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const userController = require('../controllers/userController');

// REGISTER

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;
