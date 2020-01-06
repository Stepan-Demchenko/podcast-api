const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validator');
const { authSchema } = require('../validators/auth');
const controller = require('../controllers/auth.controller');

router.post('/login', validate(authSchema), controller.login);
router.post('/register', validate(authSchema), controller.register);

module.exports = router;
