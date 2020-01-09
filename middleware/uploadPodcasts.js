const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/podcasts');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "audio/mp3") {
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
