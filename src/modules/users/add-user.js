const { hash } = require('bcryptjs');
const User = require('./User');
const config = require('../../shared/config');
const jwt = require('jsonwebtoken');

const addUser = async (data) => {
  const hashedPassword = await hash(data.password, 10);
  const existing = await User.create({ ...data, password: hashedPassword });
  const token = jwt.sign({ user: { id: existing._id } }, config.jwt.secret);

  return {token ,userObj : existing._id};
};

module.exports = addUser;
