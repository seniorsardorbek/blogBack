const User = require('./User');

const listUsers = async () => {
  const users = await User.find();

  return users;
};

module.exports = listUsers;
