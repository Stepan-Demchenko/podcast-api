const Joi = require('@hapi/joi');

const userSchema = Joi.object({
  name: Joi.string().trim().required(),
  nickName: Joi.string().trim().required(),
  email:Joi.string().trim().email(),
  password:string().trim().min(6).required()
});

module.exports = { userSchema };
