const Joi = require('@hapi/joi');

const articleSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required()
});

module.exports = { categorySchema };
