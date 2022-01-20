const { combineResolvers } = require('graphql-resolvers');
const { AuthenticationError } = require('apollo-server-express');

const Task = require('../models/taskModel');
const { isAuthenticated, isTaskOwner } = require('./middleware/authMiddleware');
const { stringToBase64, base64ToString } = require('../utils/util');
module.exports = {
  Query: {
    tasks: combineResolvers(
      isAuthenticated,
      async (_, { cursor, limit = 10 }, { userId }) => {
        try {
          const query = { user: userId };
          if (cursor) {
            query['_id'] = {
              $lt: base64ToString(cursor),
            };
          }
          let tasks = await Task.find(query)
            .sort({ _id: -1 })
            .limit(limit + 1);
          const hasNextPage = tasks.length > limit;
          tasks = hasNextPage ? task.slice(0, -1) : tasks;
          return {
            tasks,
            pageInfo: {
              nextPageCursor: hasNextPage
                ? stringToBase64(tasks[tasks.length - 1].id)
                : null,
              hasNextPage,
              count: tasks.length,
            },
          };
        } catch (error) {
          throw new Error(error);
        }
      }
    ),
    task: combineResolvers(
      isAuthenticated,
      isTaskOwner,
      async (_, { input }, { userId }) => {
        try {
          const task = await Task.findById(input.id);
          return task;
        } catch (error) {
          throw new Error(error);
        }
      }
    ),
  },

  Mutation: {
    createTask: combineResolvers(
      isAuthenticated,
      async (_, { input }, { userId }) => {
        try {
          const task = await Task.create({ ...input, user: userId });
          return task;
        } catch (error) {
          throw new Error(error);
        }
      }
    ),

    updateTask: combineResolvers(
      isAuthenticated,
      isTaskOwner,
      async (_, { id, input }, { userId }) => {
        try {
          const task = await Task.findByIdAndUpdate(
            id,
            { ...input },
            { new: true }
          );
          return task;
        } catch (error) {
          throw new Error(error);
        }
      }
    ),
    deleteTask: combineResolvers(
      isAuthenticated,
      isTaskOwner,
      async (_, { id }, { userId }) => {
        try {
          const task = await Task.findByIdAndDelete(id);
          // await User.updateOne({ _id: userId }, { $pull: { tasks: tasks.id } });// if tasks exist in user schema
          return task;
        } catch (error) {
          throw new Error(error);
        }
      }
    ),
  },

  Task: {
    user: async (_, __, { loaders }) => {
      try {
        // const user = await User.findById(parent.user);
        //converting object id into string
        const user = await loaders.user.load(parent.user.toString());
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
