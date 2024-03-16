const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Course = require('../models/course.model');
const Member = require('../models/member.model');
const Section = require('../models/section.model');

dotenv.config();

console.log('DATABASE:', process.env.DATABASE_LOCAL);

mongoose
  .connect(process.env.DATABASE_LOCAL, { dbName: 'PE_SDN301m_TrialTest_SE161079DB' })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

//READ JSON FILE
const courses = JSON.parse(fs.readFileSync(`${__dirname}/courses.json`, 'utf-8'));
const members = JSON.parse(fs.readFileSync(`${__dirname}/members.json`, 'utf-8'));
const sections = JSON.parse(fs.readFileSync(`${__dirname}/sections.json`, 'utf-8'));

const importData = async () => {
  try {
    await Course.create(courses, { validateBeforeSave: false });
    await Member.create(members, { validateBeforeSave: false });
    await Section.create(sections, { validateBeforeSave: false });
    console.log('Data successfully loaded');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Course.deleteMany();
    await Member.deleteMany();
    await Section.deleteMany();
    console.log('Data successfully Deleted');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

console.log(process.argv);

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
