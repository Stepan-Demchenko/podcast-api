const multer = require('multer');
const path = require('path');
const fs = require('fs');

const BASE_AUDIO_PATH = 'uploads/podcasts';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (!fs.existsSync(BASE_AUDIO_PATH)) {
      fs.mkdirSync(BASE_AUDIO_PATH, { recursive: true });
    }
    cb(null, BASE_AUDIO_PATH);
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'audio/mpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 300
};

module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
});
