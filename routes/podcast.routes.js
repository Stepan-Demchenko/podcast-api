const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validator');
const controller = require('../controllers/podcast.controller');
const { checkToken } = require('../middleware/jwt');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.delete('/:id', controller.delete);
router.patch('/:id', controller.update);

module.exports = router;
