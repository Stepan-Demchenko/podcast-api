const express = require('express');
const router = express.Router();

const { validate } = require('../middleware/validator');
const controller = require('../controllers/comment.controller');
const { checkToken } = require('../middleware/jwt');
const { commentSchema } = require('../validators/comment');
const { authorize, roles } = require('../middleware/authorization');
const Comment = require('../models/comment');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post(
  '/podcasts/:podcastId',
  checkToken,
  validate(commentSchema),
  controller.create
);
router.delete(
  '/:id',
  checkToken,
  authorize(roles.me, Comment, 'author'),
  controller.delete
);
router.patch('/:id', checkToken, controller.update);

module.exports = router;
