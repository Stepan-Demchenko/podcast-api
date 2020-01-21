const multer = require('multer');
const path = require('path');
const fs = require('fs');
const generateRandomString = require('../utils/generateRandomString');

module.exports = (imgRoot = 'avatar') => {
  const BASE_PATH = 'uploads';

  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      if (!fs.existsSync(BASE_PATH + '/' + imgRoot)) {
        fs.mkdirSync(BASE_PATH + '/' + imgRoot, { recursive: true });
      }
      cb(null, BASE_PATH + '/' + imgRoot);
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

  return multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
  });
};
