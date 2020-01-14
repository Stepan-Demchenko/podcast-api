const express = require('express');
const router = express.Router();

const { validate } = require('../middleware/validator');
const controller = require('../controllers/comment.controller');
const { checkToken } = require('../middleware/jwt');
const { commentSchema } = require('../validators/comment');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post(
  '/podcasts/:podcastId',
  checkToken,
  validate(commentSchema),
  controller.create
);
router.delete('/:id', checkToken, controller.delete);
router.patch('/:id', checkToken, controller.update);

module.exports = router;
