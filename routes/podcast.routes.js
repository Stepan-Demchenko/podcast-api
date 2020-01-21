const express = require('express');
const router = express.Router();
const controller = require('../controllers/podcast.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post(
  '/',
  checkToken,
  uploadMedia.fields([{ name: 'images', maxCount: 5 }, { name: 'audio', maxCount: 1 }]),
  validate(podcastSchema),
  controller.create
);
router.delete('/:id', checkToken, controller.delete);
