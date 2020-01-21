const express = require('express');
const router = express.Router();
const { checkToken } = require('../middleware/jwt');
const controller = require('../controllers/podcast.controller');
const uploadAudio = require('../middleware/uploadAudio');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post(
  '/channel/:channelId',
  checkToken,
  uploadAudio().single('audioSrc'),
  /* validate(podcastSchema), */
  controller.create
);
router.delete('/:id', checkToken, controller.delete);

module.exports = router;
