module.exports = {
  Query: {
    greetings: () => 'Hellow world',
    tasks: () => tasks,
  },
  Mutation: {
    createTask: (parent, args, contex, info) => {},
  },
  Task: {
    user: (parent, args, contex, info) =>
      users.find((user) => user.id === parent.userId),
  },
};
