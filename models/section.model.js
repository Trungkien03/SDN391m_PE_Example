const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const sectionSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String,
      required: true,
    },
    sectionDescription: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    isMainTask: {
      type: Boolean,
      default: false,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Courses',
      required: true,
    },
  },
  { timestamps: true },
);

const section = mongoose.model('Sections', sectionSchema);

module.exports = section;
