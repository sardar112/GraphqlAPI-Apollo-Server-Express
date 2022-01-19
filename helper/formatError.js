const { UserInputError } = require('apollo-server-express');

module.exports.formatError = (err) => {
  if (err.message.startsWith('Variable')) {
    return new UserInputError('Input variables not valid');
  }
  return {
    message: err.message,
    code: err.extensions.code,
  };
};
