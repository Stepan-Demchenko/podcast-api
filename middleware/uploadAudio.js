const multer = require('multer');
const path = require('path');
const fs = require('fs');
const generateRandomString = require('../utils/generateRandomString');

const BASE_PATH = 'uploads';
let uploadFilesFolder;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (!fs.existsSync(BASE_PATH + '/' + uploadFilesFolder)) {
      fs.mkdirSync(BASE_PATH + '/' + uploadFilesFolder, { recursive: true });
    }
    cb(null, BASE_PATH + '/' + uploadFilesFolder);
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
  if (file.mimetype === 'audio/mpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5
};

module.exports = (audioRoot = 'podcasts') => {
  uploadFilesFolder = audioRoot;

  return multer({
    storage: storage,
    fileFilter: fileFilter,
    limits
  });
};
