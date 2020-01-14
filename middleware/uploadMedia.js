const multer = require('multer');
const path = require('path');
const fs = require('fs');
const generateRandomString = require('../utils/generateRandomString');

const BASE_IMG_PATH = 'uploads/img';
const BASE_AUDIO_PATH = 'uploads/podcasts';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (!fs.existsSync(BASE_AUDIO_PATH) && !fs.existsSync(BASE_IMG_PATH)) {
      fs.mkdirSync(BASE_AUDIO_PATH, { recursive: true });
      fs.mkdirSync(BASE_IMG_PATH, { recursive: true });
    }
    if (req.files['images']) {
      cb(null, BASE_IMG_PATH);
    }
    if (req.files['audio'][0]) {
      cb(null, BASE_AUDIO_PATH);
    }
  },
  filename: function(req, file, cb) {
    cb(
      null,
      generateRandomString() +
      '-' +
      Date.now() +
      path.extname(file.originalname)
    );
  }
});

const limits = {
  fileSize: 1024 * 1024 * 300
};

module.exports = multer({
   storage,
   limits
});
