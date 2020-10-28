const { PORT } = require('./common/config');
const app = require('./app');
const { initDB } = require('./DB');

initDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
