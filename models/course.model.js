const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      require: true,
    },
    courseImage: {
      type: String,
      require: true,
    },
    courseDescription: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

const course = mongoose.model('Course', courseSchema);

module.exports = course;
