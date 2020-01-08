const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validator');
const controller = require('../controllers/podcast.controller');
const { checkToken } = require('../middleware/jwt');

router.get('/', controller.getAll);
router.post('/', checkToken, controller.create);
router.delete('/:id', checkToken, controller.delete);
router.patch('/:id', checkToken, controller.update);

module.exports = router;
