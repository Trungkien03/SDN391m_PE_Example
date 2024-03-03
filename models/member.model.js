const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    imageUrl: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

const member = mongoose.model('Member', memberSchema);

module.exports = member;
