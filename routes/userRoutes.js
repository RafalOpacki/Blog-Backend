const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();
const userSchemaValidation = require('../validation/userValidation');

// REGISTER
//service for register?

router.post('/register', async (req, res) => {
  const isAlreadyInDatabase = await User.findOne({ email: req.body.email });
  if (isAlreadyInDatabase) {
    return res.json({ message: 'Email already in database' });
  }
  const validation = await userSchemaValidation.validate(req.body);
  if (validation.error) {
    return res.json({ message: validation.error.details[0].message });
  }

  const salt = await bcrypt.genSalt(10);
  const saltedPassword = await bcrypt.hash(req.body.password, salt);

  const user = await new User({
    name: req.body.name,
    email: req.body.email,
    password: saltedPassword,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
