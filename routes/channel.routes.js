const express = require('express');
const router = express.Router();

const { checkToken } = require('../middleware/jwt');
const { validate } = require('../middleware/validator');
const uploadImg = require('../middleware/uploadImg');
const { podcastSchema } = require('../validators/podcast');
const controller = require('../controllers/channel.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post(
  '/',
  checkToken,
  uploadImg('/channel').single('channelAvatar'),
  validate(podcastSchema),
  controller.create
);
router.delete('/:id', checkToken, controller.delete);
router.patch('/:id', checkToken, controller.update);

module.exports = router;
