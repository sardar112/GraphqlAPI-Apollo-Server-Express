const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    // task: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Task',
    // },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('User', userSchema);
