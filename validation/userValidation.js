const Joi = require('@hapi/joi');

const userRegisterSchemaValidation = Joi.object({
  name: Joi.string().required().min(6),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});

const userEditSchemaValidation = Joi.object({
  name: Joi.string().required().min(6),
  email: Joi.string().required().email(),
});

const userPasswordValidation = Joi.object({
  oldPassword: Joi.string().required().min(6),
  newPassword: Joi.string().required().min(6),
});

module.exports = {
  userRegisterSchemaValidation,
  userEditSchemaValidation,
  userPasswordValidation,
};
