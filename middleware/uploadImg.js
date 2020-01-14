const multer = require('multer');
const path = require('path');
const fs = require('fs');
const generateRandomString = require('../utils/generateRandomString');

const BASE_IMG_PATH = 'uploads/img';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (!fs.existsSync(BASE_IMG_PATH)) {
      fs.mkdirSync(BASE_IMG_PATH, { recursive: true });
    }
    cb(null, BASE_IMG_PATH);
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

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5
};

module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
});
