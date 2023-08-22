const { compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../../shared/errors');
const config = require('../../shared/config');
const User = require('./User');

const loginUser = async ({ email, password }) => {
  const existing = await User.findOne({ email });

  if (!existing) {
    throw new UnauthorizedError('Incorrect email or password.');
  }

  const match = await compare(password, existing.password);

  if (!match) {
    throw new UnauthorizedError('Incorrect email or password.');
  }

  const token = jwt.sign({ user: { id: existing._id } }, config.jwt.secret);

  return {token , existing};
};

module.exports = loginUser;
