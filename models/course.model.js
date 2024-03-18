const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const course = mongoose.model('Courses', courseSchema);

module.exports = course;
