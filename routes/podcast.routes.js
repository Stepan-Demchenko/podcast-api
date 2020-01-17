const express = require('express');
const router = express.Router();

const { checkToken } = require('../middleware/jwt');
const { validate } = require('../middleware/validator');
const uploadMedia = require('../middleware/uploadMedia');
const { podcastSchema } = require('../validators/podcast');
const controller = require('../controllers/podcast.controller');
const { authorize, roles } = require('../middleware/authorization');
const Podcast = require('../models/podcast');

router.get('/', controller.getAll);
router.post(
  '/',
  checkToken,
  uploadMedia.fields([
    { name: 'images', maxCount: 5 },
    { name: 'audio', maxCount: 1 }
  ]),
  validate(podcastSchema),
  controller.create
);
router.delete(
  '/:id',
  checkToken,
  authorize(roles.me, Podcast, 'publisher'),
  controller.delete
);
router.patch('/:id', checkToken, controller.update);

module.exports = router;
