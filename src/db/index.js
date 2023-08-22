const mongoose = require('mongoose');
const config = require('../shared/config');

module.exports = function () {
  return mongoose
    .connect(`mongodb+srv://${config.db.host}@cluster0.ysxkkxu.mongodb.net/`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('DB ga ulandi.');
    })
    .catch((err) => {
      console.log('DB da xatolik: ', err);
    });
};
