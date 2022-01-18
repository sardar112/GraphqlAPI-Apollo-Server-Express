const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    greetings: String!
    tasks(cursor: String, limit: Int): TaskFeed
    task(id: ID!): Task
  }

  type TaskFeed {
    taskFeed: [Task!]
    pageInfo: PagesInfo!
  }
  type PagesInfo {
    nextPageCursor: String
    hasNextPage: Boolean
    count: Int
  }

  extend type Mutation {
    createTask(input: createTaskInput!): Task
    updateTask(id: ID!, input: updateTaskInput!): Task
    deleteTask(id: ID!): Task
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
  }

  input updateTaskInput {
    name: String
    completed: Boolean
  }
`;
