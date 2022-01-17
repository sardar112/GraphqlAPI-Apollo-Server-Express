const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    greetings: String!
    tasks: [Task!]
    task(id: ID!): Task
  }

  extend type Mutation {
    createTask(input: createTaskInput!): Task
  }

  type Task {
    id: ID!
    name: String!
    email: String!
    completed: Boolean!
    user: User!
    createdAt: Date
    updatedAt: Date
  }

  input createTaskInput {
    name: String!
    completed: Boolean!
    userId: ID!
  }
`;
