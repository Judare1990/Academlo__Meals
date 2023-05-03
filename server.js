require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');
const initModel = require('./models/initModel');

db.authenticate()
  .then(() => console.log('Database Authenticated ✔'))
  .catch((error) => console.log(error));

initModel();

db.sync()
  .then(() => console.log('Database Synced! ✔'))
  .catch((error) => console.log(error));

console.log('Somos campeones del mundo ⭐⭐⭐!');

const port = +process.env.PORT || 3200;
app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
