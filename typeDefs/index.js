const { gql } = require('apollo-server-express');

const userTypeDef = require('./userType');
const taskTypeDef = require('./taskType');

const typeDefs = gql`
  scalar Date

  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

module.exports = [typeDefs, userTypeDef, taskTypeDef];
