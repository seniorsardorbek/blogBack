const { compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../../shared/errors');
const config = require('../../shared/config');
const User = require('./User');

const loginUser = async ({ email, password }) => {
  const existing = await User.findOne({ email });
  console.log('salom');
  if (!existing) {
    throw new UnauthorizedError('Incorrect email or password.');
  }

  const match = await compare(password, existing.password);

  if (!match) {
    throw new UnauthorizedError('Incorrect email or password.');
  }

  const token = jwt.sign({ user: { id: existing._id } }, config.jwt.secret);

  return {token , userObj : existing._id};
};

module.exports = loginUser;
