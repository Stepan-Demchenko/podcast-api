const express = require('express');
const router = express.Router();

const { checkToken } = require('../middleware/jwt');
const controller = require('../controllers/rate.controller');

router.post('/',checkToken, controller.setRate);
module.exports = router;
