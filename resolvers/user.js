const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { combineResolvers } = require('graphql-resolvers');
const {
  UserInputError,
  AuthenticationError,
} = require('apollo-server-express');

const User = require('../models/userModel');
const Task = require('../models/taskModel');

const { isAuthenticated } = require('./middleware/authMiddleware');

module.exports = {
  Query: {
    users: combineResolvers(isAuthenticated, async (_, __, { userId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new ApolloError('User not found', 'NOT_FOUND');
        }
        return user;
      } catch (error) {
        throw new Error(error);
      }
    }),
  },

  Mutation: {
    signUp: async (_, { input }) => {
      try {
        const user = await User.findOne({ email });
        if (user) {
          throw new ApolloError('Email Already In Use', 'DUPLICATE');
        }
        const hashedPassword = await bcrypt.hash(input.password, 12);
        const newUser = await User.create(...input, password, hashedPassword);
        return newUser;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },

    login: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });
        if (!user) {
          throw new ApolloError('User not found', 'NOT_FOUND');
        }
        const isValidPassword = await bcrypt.compare(
          input.password,
          user.password
        );
        if (!isValidPassword) {
          throw new AuthenticationError('Incorrect Password');
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '10d',
        });
        return { token };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
  },

  User: {
    tasks: async (parent, _, __) => {
      try {
        const tasks = await Task.find({ user: parent.id });
        return tasks;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
