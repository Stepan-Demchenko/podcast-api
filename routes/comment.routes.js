const express = require('express');
const router = express.Router();

const { validate } = require('../middleware/validator');
const controller = require('../controllers/comment.controller');
const { checkToken } = require('../middleware/jwt');
const { categorySchema } = require('../validators/category');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post(
  '/articles/:articleId',
  checkToken,
  validate(categorySchema),
  controller.create
);
router.delete('/:id', checkToken, controller.delete);
router.patch('/:id', checkToken, controller.update);

module.exports = router;
