const Joi = require('@hapi/joi');

const articleSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required()
});

module.exports = { articleSchema };
