const Joi = require('@hapi/joi');

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required()
});

const registerSchema = Joi.object({
  name: Joi.string().required(),
  nickName: Joi.string().required(),
  about: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required()
});

module.exports = { loginSchema, registerSchema };
