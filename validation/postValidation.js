const Joi = require('@hapi/joi');

const postSchemaValidation = Joi.object({
  title: Joi.string()
    .required()
    .min(6),
  content: Joi.string()
    .required()
    .min(6),
  category: Joi.string()
    .required()
    .min(6),
  author: Joi.string()
    .required()
    .min(6),
  tags: Joi.array().items(Joi.string()),
});

module.exports = postSchemaValidation;
