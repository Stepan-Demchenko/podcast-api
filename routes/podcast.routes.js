const express = require('express');
const router = express.Router();

const { checkToken } = require('../middleware/jwt');
const { validate } = require('../middleware/validator');
const uploadMedia = require('../middleware/uploadMedia');
const { podcastSchema } = require('../validators/podcast');
const controller = require('../controllers/canal');


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
router.patch('/:id', checkToken, controller.update);

module.exports = router;
