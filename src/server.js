const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const mongoose = require('mongoose');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}.`)
);

mongoose.connect(
  MONGO_CONNECTION_STRING,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) {
      throw new Error(err);
    } else {
      console.log('Database connected.');
    }
  }
);
