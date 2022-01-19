const { skip } = require('graphql-resolvers');
const { UserInputError, ForbiddenError } = require('apollo-server-express');

const { isValidObjectID } = require('./../../utils/util');
const Task = require('./../../models/taskModel');

module.exports.isAuthenticated = (parent, args, { userId }, info) => {
  if (!userId) {
    throw new ForbiddenError('Access denied, please login');
  }
  return skip;
};

module.exports.isTaskOwner = async (parent, { input }, { userId }, info) => {
  try {
    if (!isValidObjectID(input.id)) throw new UserInputError('Invalid ID');
    const task = await Task.findById(input.id);
    if (!task) {
      throw new Error('Task not found with this id');
    } else if (task.user.toString() !== userId) {
      throw new ForbiddenError('Your are not Authorized to access this task');
    }
    return skip;
  } catch (err) {
    throw err;
  }
};
