const fs = require('fs');

module.exports = (files) => {
  files = Array.isArray(files) ? files : Array(files);
  for (const file of files) {
    fs.unlink(file, err => {
      if (err) throw err;
    });
  }
};
