const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const member = mongoose.model('Members', memberSchema);

module.exports = member;
