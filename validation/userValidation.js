const Joi = require('@hapi/joi');

const userSchemaValidation = Joi.object({
  name: Joi.string()
    .required()
    .min(6),
  email: Joi.string()
    .required()
    .email(),
  password: Joi.string()
    .required()
    .min(6),
});

module.exports = userSchemaValidation;
