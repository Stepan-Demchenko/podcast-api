const fs = require('fs');

module.exports = function(files) {
  files = Array.isArray(files) ? files : Array(files);
  console.log(files);
  for (const file of files) {
    fs.unlink(file, (err) => {
      if (err) throw err;
    });
  }
};
