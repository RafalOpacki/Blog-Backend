const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.patch('/update/:userId', userController.editUser);
router.patch('/changePassword/:userId', userController.changePassword);

module.exports = router;
