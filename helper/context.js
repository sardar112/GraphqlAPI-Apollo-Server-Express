const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

module.exports.verifyUser = async (req) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.id = decoded.id;
    }
  } catch (error) {
    throw new AuthenticationError('Invalid Token or Expired', err);
  }
};
