const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validator');
const { loginSchema, registerSchema } = require('../validators/auth');
const controller = require('../controllers/auth.controller');
const uploadImg = require('../middleware/uploadImg');

router.post('/login', validate(loginSchema), controller.login);
router.post(
  '/register',
  uploadImg('/avatar').single('avatar'),
  validate(registerSchema),
  controller.register
);
router.post('/token/refresh', controller.refreshToken);
module.exports = router;
