const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { combineResolvers } = require('graphql-resolvers');

const User = require('../models/userModel');
const { isAuthenticated } = require('./middleware/authMiddleware');

module.exports = {
  Query: {
    greetings: () => 'Hellow world',
    users: combineResolvers(isAuthenticated, (_, { id }, { userId }) => {
      return 'users';
    }),
  },
  Mutation: {
    signUp: async (_, { input }, contex, info) => {
      try {
        const user = await User.findOne({ email });
        if (user) {
          throw new Error(`User  with this email already exists`);
        }
        const hashedPassword = await bcrypt.hash(input.password, 12);
        const newUser = await User.create(...input, password, hashedPassword);
        return newUser;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    login: async (_, { input }, contex, info) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error(`User  with this email does not exists`);
        }
        const isValidPassword = await bcrypt.compare(
          input.password,
          user.password
        );
        if (!isValidPassword) {
          throw new Error(`Incorrect password`);
        }
        const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET, {
          expiresIn: '90d',
        });
        return { token };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
  },
  User: {
    task: (parent, args, contex, info) =>
      users.filter((task) => task.userid === parent.id),
  },
};
