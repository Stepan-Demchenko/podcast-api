const Joi = require('@hapi/joi');

const podcastSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required()
});

module.exports = { podcastSchema };
