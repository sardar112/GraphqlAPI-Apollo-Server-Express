const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
  }

  extend type Mutation {
    signUp(input: signUpInput!): User
    login(input: loginInput!): Token
  }

  type {
    token: String!
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    task: [Task!]
    createdAt: Date
    updatedAt: Date
  }

  input signUpInput {
    name: String!
    email: String!
    password: String!
  }

  input loginInput {
    email: String!
    password: String!
  }
`;
