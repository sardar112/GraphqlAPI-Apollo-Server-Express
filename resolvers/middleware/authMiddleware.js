const { skip } = require('graphql-resolvers');

module.exports.isAuthenticated = (_, _, { userId }) => {
  if (userId) {
    throw new Error('Access denied, please login');
  }
  return skip;
};
