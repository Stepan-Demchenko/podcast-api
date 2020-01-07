const app = require('./app');
const { PORT } = require('./config');

app.listen(PORT, () =>
  console.log(`Server has been started at http://localhost:${PORT}`.yellow.bold)
);
