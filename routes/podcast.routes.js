const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validator');
const controller = require('../controllers/podcast.controller');
const { checkToken } = require('../middleware/jwt');
const imgUpload = require('../middleware/uploadImg');
const podcastUpload = require('../middleware/uploadPodcasts');
const { podcastSchema } = require('../validators/podcast');

router.get('/', checkToken, controller.getAll);
router.post(
  '/',
  checkToken,
  imgUpload.array('imagesSrc', 5),
  // podcastUpload.single('podcast'),
  validate(podcastSchema),
  controller.create
);
router.delete('/:id', checkToken, controller.delete);
router.patch('/:id', checkToken, controller.update);

module.exports = router;
