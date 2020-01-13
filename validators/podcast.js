const Joi = require('@hapi/joi');

const podcastSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  // decoded: Joi.object().required(),
  categories: Joi.array()
    .min(1)
    .required()
});

module.exports = { podcastSchema };
