const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { UnauthorizedError } = require('../errors');
const User = require('../../modules/users/User');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedError('Unauthorized.');
    }
   
    const decoded = jwt.verify(token, config.jwt.secret, { ignoreExpiration: false });
    const exist = await User.findById(decoded.user.id)
    if(!exist){
      throw new UnauthorizedError('User not found!')
    }
    req.user = decoded.user;

    next();
  } catch (error) {
    console.log(error);
    next(new UnauthorizedError(error.message));
  }
};

module.exports = isLoggedIn;
