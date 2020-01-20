const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validator');
const { loginSchema, registerSchema } = require('../validators/auth');
const controller = require('../controllers/auth.controller');

router.post('/login', validate(loginSchema), controller.login);
router.post('/register', validate(registerSchema), controller.register);

module.exports = router;
