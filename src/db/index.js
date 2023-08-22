const mongoose = require('mongoose');

module.exports = function () {
  return mongoose
    .connect('mongodb+srv://sardorbekmusilman:Just_password03@cluster0.ysxkkxu.mongodb.net/', {
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
