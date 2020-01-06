const Joi = require('@hapi/joi');

const authSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required()
});

/* const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),

  confirmPassword: Joi.ref('password')
}).with('password', 'confirmPassword'); */

module.exports = { authSchema };
