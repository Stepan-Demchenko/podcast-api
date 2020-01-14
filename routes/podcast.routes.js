const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validator');
const controller = require('../controllers/podcast.controller');
const { checkToken } = require('../middleware/jwt');
const { podcastSchema } = require('../validators/podcast');
const uploadMedia = require('../middleware/uploadMedia');
// const uploadPodcasts = require('../middleware/uploadPodcasts');

router.get('/', checkToken, controller.getAll);
router.post(
  '/',
  checkToken,
  // uploadPodcasts.single('audio'),
  uploadMedia.fields([{ name: 'images', maxCount: 5 }, { name: 'audio', maxCount: 1 }]),
  validate(podcastSchema),
  controller.create
);
router.delete('/:id', checkToken, controller.delete);
router.patch('/:id', checkToken, controller.update);

module.exports = router;
