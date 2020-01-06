const Joi = require('@hapi/joi');

const categorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required()
});

module.exports = { categorySchema };
