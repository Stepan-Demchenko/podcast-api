function getPath() {
  if (process.env.NODE_ENV === 'development') return '.env';
  return '.env.test';
}

/* TODO: find a better option for handling this */
if (process.env.NODE_ENV !== 'production') {
  const result = require('dotenv').config({ path: getPath() });
  const { parsed: envs } = result;
  module.exports = envs;
} else {
  module.exports = process.env;
}
