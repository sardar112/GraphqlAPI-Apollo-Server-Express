const { GraphQLDateTime } = require('graphql-iso-date');

const { taskResolver } = require('../resolvers/task');
const { userResolver } = require('../resolvers/user');

const customDateScalarResolver = {
  Date: GraphQLDateTime,
};
module.exports = [taskResolver, userResolver, customDateScalarResolver];
