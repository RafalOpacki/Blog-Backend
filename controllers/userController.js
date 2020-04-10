const userValidation = require('../validation/userValidation');
const User = require('../models/User').userModel;
const bcrypt = require('bcrypt');

// REGISTER

const registerUser = async (req, res) => {
  try {
    const isEmailInDatabase = await User.findOne({ email: req.body.email });
    if (isEmailInDatabase) {
      return res.status(409).json({ message: 'Email already in database' });
    }
    const isNameInDatabase = await User.findOne({ name: req.body.name });
    if (isNameInDatabase) {
      return res.status(409).json({ message: 'Name already in database' });
    }
    const validation = await userValidation.validate(req.body);
    if (validation.error) {
      return res
        .status(409)
        .json({ message: validation.error.details[0].message });
    }

    const salt = await bcrypt.genSalt(10);
    const saltedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await new User({
      name: req.body.name,
      email: req.body.email,
      password: saltedPassword,
    });
    const savedUser = await user.save();
    res.json({ savedUser, message: 'User added successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// LOGIN

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      return res.status(409).json({ message: 'User is not in database' });
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      return res.status(409).json({ message: 'Invalid password' });
    }
    return res.json({ message: 'User logged in', authenticated: true });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
