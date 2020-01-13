const Joi = require('@hapi/joi');

const podcastSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  publisher: Joi.string().required(),
  categories: Joi.array().min(1)
});

module.exports = { podcastSchema };
