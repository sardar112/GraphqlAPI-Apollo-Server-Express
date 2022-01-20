const mongoose = require('mongoose');

module.exports.connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connection established');
  } catch (error) {
    console.log('connection failed', error);
    throw new Error(error.message);
  }
};

module.exports.isValidObjectID = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports.stringToBase64 = (data) => Buffer.from(data).toString('base64');
module.exports.base64ToString = (data) =>
  Buffer.from(data, 'base64').toString('ascii');
